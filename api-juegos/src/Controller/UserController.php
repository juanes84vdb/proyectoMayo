<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Types\Types;
use App\Repository\UserRepository;

#[Route('/usuarios')]
class UserController extends AbstractController
{
    #[Route('/todos', name: 'app_usuarios_todos', methods: ['GET'])]
        public function todosj(UserRepository $usuariosRepository, Request $request): Response
        {
            $usuarios=$usuariosRepository->findAll();
            $usuariosArray=[];
            foreach($usuarios as $usuario){
                    $usuariosArray[]=[
                        'id'=>$usuario->getId(),
                        'nombre'=>$usuario->getUsername()
                    ];
            }
                $response = new JsonResponse();
                $response->setData(
                    $usuariosArray
                );
                return $response;
        }
    #[Route('/perfil', name: 'app_perfil')]
        public function index(): Response
        {
            $user=$this->getUser();
            $usuario[]=[
                'usuario' => $user->getUserIdentifier(),
                'id'=> $user->getId(),
                'ganadas'=>$user->getPartidasGanadas(),
                'perdidas'=>$user->getPartidasPerdidos(),
                'empezadas'=>$user->getPartidasTotales(),
                'terminadas'=>$user->getPartidasTerminadas()
            ];
            $response = new JsonResponse();
            $response->setData(
                $usuario
            );
            return $response;
        }
        #[Route('/ranking', name: 'app_ranking')]
        public function ranking(UserRepository $usuariosRepository, Request $request): Response
        { $usuarios=$usuariosRepository->findAll();
            $usuariosArray=[];
            foreach($usuarios as $usuario){
                $usuariosArray[]=[
                    'nombre'=>$usuario->getUsername(),
                    'ganadas'=>$usuario->getPartidasGanadas(),
                    'perdidas'=>$usuario->getPartidasPerdidos(),
                    'empezadas'=>$usuario->getPartidasTotales(),
                    'terminadas'=>$usuario->getPartidasTerminadas(),
                    'posicion'=>0
                ];
            }
            $response = new JsonResponse();
            $response->setData(
                $usuariosArray
            );
            return $response;
        }
}