<?php

namespace App\Controller;

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

#[Route('/juegos')]
class JuegosController extends AbstractController
{
    #[Route('/todos', name: 'app_juegos_todos', methods: ['GET'])]
    public function todosj(JuegosRepository $juegosRepository, Request $request): Response
    {
        $juegos=$juegosRepository->findAll();
        $juegosArray=[];
        foreach($juegos as $juego){
                $juegosArray[]=[
                    'id'=>$juego->getId(),
                    'nombre' => $juego->getNombre(),
                    'descripcion' => $juego->getDescripcion(),
                ];
        }
            $response = new JsonResponse();
            $response->setData(
                $juegosArray
            );
            return $response;
        }
}