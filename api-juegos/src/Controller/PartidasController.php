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
    #[Route('/partida', name: 'app_partidas_partida', methods: ['GET', 'POST', 'PUT'])]
    public function todosj(PartidasRepository $partidasrepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $jugador=$data['jugador'];
        $partida=$entityManager->getRepository(Partidas::class)->find($id);

        if ($partida->getJugador1()->getId()==$jugador || $partida->getJugador2()->getId()==$jugador){
        $partidaArray=[];
        $partidaArray[]=[
            'filas' =>$partida->getFilas(),
            'acabado' =>$partida->isAcabada(),
            'turno'=>$partida->isTurno(),
            'id'=>$partida->getId(),
            'fichas'=>$partida->getFichas(),
            'tablas'=>false
        ];
    $response = new JsonResponse();
    $response->setData(
        $partidaArray
    );
    return $response;
        }
        $partidaArray[]=["error al cargar la partida"];
            $response = new JsonResponse();
            $response->setData(
                $partidaArray
            );
            return $response;
}

    #[Route('/partidaupdate', name: 'app_partidas_update', methods: ['POST', 'PUT'])]
    public function updatepartida(Request $request, 
    EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $id = $data[0]['id'];
        $turno=$data[0]["turno"];
        $filas=$data[0]["filas"];
        $fichas=$data[0]["fichas"];
        $acabada=$data[0]["acabado"];
        $tablas=$data[0]["tablas"];

        $partida=$entityManager->getRepository(Partidas::class)->find($id);

        $jugador1 =$entityManager->getRepository(User::class)->find($partida->getJugador1()->getId());
        $jugador2 = $entityManager->getRepository(User::class)->find($partida->getJugador2()->getId());

        if($acabada==true){
            if($tablas==false){
                if(!$turno){
                    $partida->setGanador($partida->getJugador1());

                    $jugador1->setPartidasGanadas($jugador1->getPartidasGanadas()+1);
                    $jugador2->setPartidasPerdidos($jugador2->getPartidasPerdidos()+1);
                }
                else{
                    $partida->setGanador($partida->getJugador2());

                    $jugador2->setPartidasGanadas($jugador2->getPartidasGanadas()+1);
                    $jugador1->setPartidasPerdidos($jugador1->getPartidasPerdidos()+1);
                }
            }
            $jugador1->setPartidasTerminadas($jugador1->getPartidasTerminadas()+1);
            $jugador2->setPartidasTerminadas($jugador2->getPartidasTerminadas()+1);
        }

        $partida->setAcabada($acabada);
        $partida->setTurno($turno);
        $partida->setFilas($filas);
        $partida->setFichas($fichas);
        $partida->setAcabada($acabada);
        $entityManager->flush();

        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];
        $jsonResponse = json_encode($responseData);
        $response = new Response($jsonResponse, Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    #[Route('/partidanew', name: 'app_partidas_new', methods: ['POST', 'PUT'])]
    public function newpartida(Request $request,
    EntityManagerInterface $entityManager,
    UserRepository $usuariosRepository,
    JuegosRepository $juegosRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $jugador1 =$entityManager->getRepository(User::class)->find($data['jugador1']);
        $jugador2 = $entityManager->getRepository(User::class)->find($data['jugador2']);
        $tipo = $entityManager->getRepository(Juegos::class)->find($data['tipo']) ;
        if($tipo->getNombre() == "Ajedrez"){
            $fichas=30;
        }
        $partida=new Partidas();

        $partida->setJugador1($jugador1);
        $partida->setJugador2($jugador2);
        $partida->setTipo($tipo);
        $partida->setAcabada(false);
        $partida->setTurno(true);
        $partida->setFichas($fichas);
        $partida->setFilas([]);
        $jugador1->setPartidasTotales($jugador1->getPartidasTotales()+1);
        $jugador2->setPartidasTotales($jugador2->getPartidasTotales()+1);
        $entityManager->persist($partida);
        $entityManager->flush();
        $entityManager->persist($jugador1);
        $entityManager->flush();
        $entityManager->persist($jugador2);
        $entityManager->flush();

        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];
        $jsonResponse = json_encode($responseData);
        $response = new Response($jsonResponse, Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}