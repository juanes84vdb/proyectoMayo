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
    #[Route('/partidas', name: 'app_usuarios_partidas', methods: ['GET','POST', 'PUT'])]
    public function partiadas(JuegosRepository $juegosRepository, Request $request,
    EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $id_juego = $data['id'];
        $id_usuario = $data['usuario'];
        $partidasArray=[];
        $ganado=null;
        if($id_juego==null){
            $juegos=$juegosRepository->findAll();
            foreach($juegos as $juego){
                $partidas=$juego->getPartidas();
                foreach($partidas as $partida){
                    if($partida->getJugador1()->getId()==$id_usuario || $partida->getJugador2()->getId()==$id_usuario){
                        if($partida->getJugador1()->getId()==$id_usuario){
                            $rival=$partida->getJugador2()->getUsername();
                            $rivalId=$partida->getJugador2()->getId();
                        }
                        else{
                            $rival=$partida->getJugador1()->getUsername();
                            $rivalId=$partida->getJugador1()->getId();
                        }
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
        else{
            $juego = $entityManager->getRepository(Juegos::class)->find($id_juego);
            $partidas=$juego->getPartidas();
            foreach($partidas as $partida){  
                if($partida->getJugador1()->getId()==$id_usuario || $partida->getJugador2()->getId()==$id_usuario){
                    if($partida->getGanador()){
                        if($partida->getGanador()->getId()==$id_usuario){
                            $ganado=true;
                        }
                        else{
                            $ganado=false;
                        }   
                    }
                    $partidasArray[]=[
                        'acabado' => $partida->isAcabada(),
                        'ganado'=> $ganado,
                        'tipo'=> $juego->getNombre(),
                        'partida'=>$partida->getId(),
                    ];
                }
            }
        }
            $response = new JsonResponse();
            $response->setData(
                $partidasArray
            );
            return $response;
    
    }
}