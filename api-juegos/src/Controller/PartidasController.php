<?php

namespace App\Controller;

use App\Entity\Partidas;
use App\Entity\Juegos;
use App\Entity\User;
use App\Form\PartidasType;
use App\Repository\PartidasRepository;
use App\Repository\UserRepository;
use App\Repository\JuegosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Types\Types;

#[Route('/partidas')]
class PartidasController extends AbstractController
    {
        /**
     * This function retrieves a specific game by its ID and the player's ID.
     * It checks if the player is a participant in the game and returns the game data.
     *
     * @Route("/partida", name="app_partidas_partida", methods={"GET", "POST", "PUT"})
     * @param PartidasRepository $partidasrepository The repository for Partidas entity.
     * @param Request $request The request object containing the game ID and player ID.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     * @return Response A JSON response containing the game data or an error message.
     */
    #[Route('/partida', name: 'app_partidas_partida', methods: ['GET', 'POST', 'PUT'])]
    public function todos(PartidasRepository $partidasrepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the game ID and player ID
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $jugador=$data['jugador'];

        // Find the game by its ID
        $partida=$entityManager->getRepository(Partidas::class)->find($id);

        // Check if the player is a participant in the game
        if ($partida->getJugador1()->getId()==$jugador || $partida->getJugador2()->getId()==$jugador){
            // Prepare the game data array
            $partidaArray=[];
            $partidaArray[]=[
                'filas' =>$partida->getFilas(),
                'acabado' =>$partida->isAcabada(),
                'turno'=>$partida->isTurno(),
                'id'=>$partida->getId(),
                'fichas'=>$partida->getFichas(),
                'tablas'=>false
            ];

            // Create a JSON response with the game data
            $response = new JsonResponse();
            $response->setData(
                $partidaArray
            );
            return $response;
        }

        // If the player is not a participant, return an error message
        $partidaArray[]=["error al cargar la partida"];
        $response = new JsonResponse();
        $response->setData(
            $partidaArray
        );
        return $response;
    }

        /**
     * This function updates the game data in the database.
     * It handles the game state, player statistics, and checks for draws.
     *
     * @Route("/partidaupdate", name="app_partidas_update", methods={"POST", "PUT"})
     * @param Request $request The request object containing the game data to be updated.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     * @return Response A JSON response indicating the success of the update operation.
     */
    #[Route('/partidaupdate', name: 'app_partidas_update', methods: ['POST', 'PUT'])]
    public function updatepartida(Request $request, 
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the game data
        $data = json_decode($request->getContent(), true);

        // Extract the game data from the request
        $id = $data[0]['id'];
        $turno=$data[0]["turno"];
        $filas=$data[0]["filas"];
        $fichas=$data[0]["fichas"];
        $acabada=$data[0]["acabado"];
        $tablas=$data[0]["tablas"];

        // Find the game in the database by its ID
        $partida=$entityManager->getRepository(Partidas::class)->find($id);

        // Fetch the players from the database
        $jugador1 =$entityManager->getRepository(User::class)->find($partida->getJugador1()->getId());
        $jugador2 = $entityManager->getRepository(User::class)->find($partida->getJugador2()->getId());

        // Check if the game is over
        if($acabada==true){
            // Check if it's a draw
            if($tablas==false){
                // Determine the winner based on the turn
                if(!$turno){
                    $partida->setGanador($partida->getJugador1());

                    // Update player statistics
                    $jugador1->setPartidasGanadas($jugador1->getPartidasGanadas()+1);
                    $jugador2->setPartidasPerdidos($jugador2->getPartidasPerdidos()+1);
                }
                else{
                    $partida->setGanador($partida->getJugador2());

                    // Update player statistics
                    $jugador2->setPartidasGanadas($jugador2->getPartidasGanadas()+1);
                    $jugador1->setPartidasPerdidos($jugador1->getPartidasPerdidos()+1);
                }
            }
            // Update player statistics for completed games
            $jugador1->setPartidasTerminadas($jugador1->getPartidasTerminadas()+1);
            $jugador2->setPartidasTerminadas($jugador2->getPartidasTerminadas()+1);
        }

        // Update the game data in the database
        $partida->setAcabada($acabada);
        $partida->setTurno($turno);
        $partida->setFilas($filas);
        $partida->setFichas($fichas);
        $partida->setAcabada($acabada);
        $entityManager->flush();

        // Prepare a response indicating the success of the update operation
        $responseData = [
            'ensaje' => 'Datos actualizados correctamente'
        ];
        $jsonResponse = json_encode($responseData);
        $response = new Response($jsonResponse, Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

        /**
     * This function creates a new game in the database.
     * It handles the game setup, player statistics, and initializes the game state.
     *
     * @Route("/partidanew", name="app_partidas_new", methods={"POST", "PUT"})
     * @param Request $request The request object containing the game data to be created.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param JuegosRepository $juegosRepository The repository for Juegos entity.
     * @return Response A JSON response indicating the success of the game creation operation.
     */
    #[Route('/partidanew', name: 'app_partidas_new', methods: ['POST', 'PUT'])]
    public function newpartida(Request $request,
        EntityManagerInterface $entityManager,
        UserRepository $usuariosRepository,
        JuegosRepository $juegosRepository): Response
    {
        // Decode the request content to get the game data
        $data = json_decode($request->getContent(), true);

        // Fetch the players from the database
        $jugador1 = $entityManager->getRepository(User::class)->find($data['jugador1']);
        $jugador2 = $entityManager->getRepository(User::class)->find($data['jugador2']);

        // Fetch the game type from the database
        $tipo = $entityManager->getRepository(Juegos::class)->find($data['tipo']);

        // Set the initial number of pieces based on the game type
        if ($tipo->getNombre() == "Ajedrez") {
            $fichas = 30;
        }

        // Create a new Partidas entity
        $partida = new Partidas();

        // Set the game data
        $partida->setJugador1($jugador1);
        $partida->setJugador2($jugador2);
        $partida->setTipo($tipo);
        $partida->setAcabada(false);
        $partida->setTurno(true);
        $partida->setFichas($fichas);
        $partida->setFilas([]);

        // Update player statistics
        $jugador1->setPartidasTotales($jugador1->getPartidasTotales() + 1);
        $jugador2->setPartidasTotales($jugador2->getPartidasTotales() + 1);

        // Persist the new game and player data in the database
        $entityManager->persist($partida);
        $entityManager->flush();
        $entityManager->persist($jugador1);
        $entityManager->flush();
        $entityManager->persist($jugador2);
        $entityManager->flush();

        // Prepare a response indicating the success of the game creation operation
        $responseData = [
            'ensaje' => 'Datos actualizados correctamente'
        ];
        $jsonResponse = json_encode($responseData);
        $response = new Response($jsonResponse, Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}