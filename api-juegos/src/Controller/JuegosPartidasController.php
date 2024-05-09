<?php

namespace App\Controller;

use App\Entity\Partidas;
use App\Form\PartidasType;
use App\Repository\PartidasRepository;
use App\Entity\Juegos;
use App\Form\JuegosType;
use App\Repository\JuegosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Types\Types;

#[Route('/usuarios')]
class JuegosPartidasController extends AbstractController
{
    /**
     * This function retrieves and processes the list of games and their respective matches for a given user.
     *
     * @Route("/partidas", name="app_usuarios_partidas", methods={"GET","POST", "PUT"})
     * @param JuegosRepository $juegosRepository The repository for accessing game data.
     * @param Request $request The request object containing the user's ID and game ID.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     * @return Response A JSON response containing the list of games and their matches.
     */
    #[Route('/partidas', name: 'app_usuarios_partidas', methods: ['GET','POST', 'PUT'])]
    public function partiadas(JuegosRepository $juegosRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the user's ID and game ID.
        $data = json_decode($request->getContent(), true);
        $id_juego = $data['id'];
        $id_usuario = $data['usuario'];

        // Initialize an array to store the game and match data.
        $partidasArray=[];
        $ganado=null;

        // If no game ID is provided, retrieve all games and their matches.
        if($id_juego==null){
            $juegos=$juegosRepository->findAll();
            foreach($juegos as $juego){
                $partidas=$juego->getPartidas();
                foreach($partidas as $partida){
                    // Check if the match is for the current user.
                    if($partida->getJugador1()->getId()==$id_usuario || $partida->getJugador2()->getId()==$id_usuario){
                        // Determine the rival's username and ID.
                        if($partida->getJugador1()->getId()==$id_usuario){
                            $rival=$partida->getJugador2()->getUsername();
                            $rivalId=$partida->getJugador2()->getId();
                        }
                        else{
                            $rival=$partida->getJugador1()->getUsername();
                            $rivalId=$partida->getJugador1()->getId();
                        }

                        // Determine if the match is won, lost, or ongoing.
                        if($partida->getGanador()!=null){
                            if($partida->getGanador()->getId()==$id_usuario){
                                    $ganado=true;
                                }
                            else if($partida->getGanador()->getId()==$rivalId){
                                    $ganado=false;
                            }   
                            else{
                                $ganado=null;
                            }
                        }

                        // Add the match data to the array.
                        $partidasArray[]=[
                            'acabado' => $partida->isAcabada(),
                            'ganado'=> $ganado,
                            'tipo'=> $juego->getNombre(),
                            'partida'=>$partida->getId(),
                            'rival'=>$rival
                        ];
                    }
                }
            }
        }
        // If a game ID is provided, retrieve only the matches for that game.
        else{
            if($juego = $entityManager->getRepository(Juegos::class)->find($id_juego)){
                $partidas=$juego->getPartidas();
                foreach($partidas as $partida){
                    // Check if the match is for the current user.
                    if($partida->getJugador1()->getId()==$id_usuario || $partida->getJugador2()->getId()==$id_usuario){
                        // Determine the rival's username and ID.
                        if($partida->getJugador1()->getId()==$id_usuario){
                            $rival=$partida->getJugador2()->getUsername();
                            $rivalId=$partida->getJugador2()->getId();
                        }
                        else{
                            $rival=$partida->getJugador1()->getUsername();
                            $rivalId=$partida->getJugador1()->getId();
                        }

                        // Determine if the match is won, lost, or ongoing.
                        if($partida->getGanador()!=null){
                            if($partida->getGanador()->getId()==$id_usuario){
                                    $ganado=true;
                                }
                            else if($partida->getGanador()->getId()==$rivalId){
                                    $ganado=false;
                            }   
                            else{
                                $ganado=null;
                            }
                        }

                        // If the game has an image, add it to the match data.
                        if($juego->getImagen()!==null){
                            $partidasArray[]=[
                                'acabado' => $partida->isAcabada(),
                                'ganado'=> $ganado,
                                'tipo'=> $juego->getNombre(),
                                'imagen' => base64_encode(stream_get_contents($juego->getImagen())),
                                'partida'=>$partida->getId(),
                                'rival'=>$rival
                            ];
                        }
                        // If the game does not have an image, add the match data without it.
                        else{
                            $partidasArray[]=[
                                'acabado' => $partida->isAcabada(),
                                'ganado'=> $ganado,
                                'tipo'=> $juego->getNombre(),
                                'partida'=>$partida->getId(),
                                'rival'=>$rival
                            ];
                        }
                    }
                }
            }
        }

        // Create a JSON response with the match data.
        $response = new JsonResponse();
        $response->setData(
            $partidasArray
        );
        return $response;
    }
}