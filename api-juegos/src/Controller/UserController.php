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
use Doctrine\ORM\EntityManagerInterface;

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
            if($user->getFotoPerfil()!==null){
                $usuario[]=[
                    'usuario' => $user->getUserIdentifier(),
                    'id'=> $user->getId(),
                    'ganadas'=>$user->getPartidasGanadas(),
                    'perdidas'=>$user->getPartidasPerdidos(),
                    'empezadas'=>$user->getPartidasTotales(),
                    'terminadas'=>$user->getPartidasTerminadas(),
                    'perfil'=>base64_encode(stream_get_contents($user->getFotoPerfil())),
                    'color'=>$user->getColor()
                ];
            }
            else{
                $usuario[]=[
                    'usuario' => $user->getUserIdentifier(),
                    'id'=> $user->getId(),
                    'ganadas'=>$user->getPartidasGanadas(),
                    'perdidas'=>$user->getPartidasPerdidos(),
                    'empezadas'=>$user->getPartidasTotales(),
                    'terminadas'=>$user->getPartidasTerminadas(),
                    'perfil'=>null,
                    'color'=>$user->getColor()
                ];
            }
           
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
                if($usuario->getFotoPerfil()!==null){
                $usuariosArray[]=[
                    'nombre'=>$usuario->getUsername(),
                    'ganadas'=>$usuario->getPartidasGanadas(),
                    'perdidas'=>$usuario->getPartidasPerdidos(),
                    'empezadas'=>$usuario->getPartidasTotales(),
                    'terminadas'=>$usuario->getPartidasTerminadas(),
                    'posicion'=>0,
                    'foto'=>base64_encode(stream_get_contents($usuario->getFotoPerfil())),
                    'id'=>$usuario->getId(),
                ];
            }
            else{
                $usuariosArray[]=[
                    'nombre'=>$usuario->getUsername(),
                    'ganadas'=>$usuario->getPartidasGanadas(),
                    'perdidas'=>$usuario->getPartidasPerdidos(),
                    'empezadas'=>$usuario->getPartidasTotales(),
                    'terminadas'=>$usuario->getPartidasTerminadas(),
                    'posicion'=>0,
                    'foto'=>null,
                    'id'=>$usuario->getId(),
                ];
            }
            }
            $response = new JsonResponse();
            $response->setData(
                $usuariosArray
            );
            return $response;
        }

        #[Route('/newcolor', name: 'app_usuarios_color', methods: ['GET', 'POST', 'PUT'])]
        public function color(UserRepository $usuariosRepository, 
        Request $request,
        EntityManagerInterface $entityManager): Response
        {
            $data = json_decode($request->getContent(), true);
            $id = $data['id'];
            $color = $data['color'];

            $usuario=$entityManager->getRepository(User::class)->find($id);

            $usuario->setColor($color);
            $entityManager->flush();
            
            $responseData = [
                'mensaje' => 'Datos actualizados correctamente'
            ];
            $jsonResponse = json_encode($responseData);
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        #[Route('/newfoto', name: 'app_usuarios_foto', methods: ['GET', 'POST', 'PUT'])]
        public function foto(UserRepository $usuariosRepository, 
        Request $request,
        EntityManagerInterface $entityManager): Response
        {
            $data = json_decode($request->getContent(), true);
            $id = $data['id'];
            $foto = $data['foto'];

            $usuario=$entityManager->getRepository(User::class)->find($id);
            if($foto!==false){
                $imagenData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $foto));
            }
            else{
                $imagenData = null;
            }
            $usuario->setFotoPerfil($imagenData);
            $entityManager->flush();
            
            $responseData = [
                'mensaje' => 'Datos actualizados correctamente'
            ];
            $jsonResponse = json_encode($responseData);
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        #[Route('/filtro', name: 'app_usuarios_filtro', methods: ['GET', 'POST', 'PUT'])]
        public function usuario(UserRepository $usuariosRepository, 
        Request $request,
        EntityManagerInterface $entityManager): Response
        {
            $data = json_decode($request->getContent(), true);
            $id = $data['id'];

            $usuario=$entityManager->getRepository(User::class)->find($id);

            if($usuario->getFotoPerfil()!==null){
                $usuariosArray[]=[
                    'nombre'=>$usuario->getUsername(),
                    'ganadas'=>$usuario->getPartidasGanadas(),
                    'perdidas'=>$usuario->getPartidasPerdidos(),
                    'empezadas'=>$usuario->getPartidasTotales(),
                    'terminadas'=>$usuario->getPartidasTerminadas(),
                    'color'=>$usuario->getColor(),
                    'posicion'=>0,
                    'foto'=>base64_encode(stream_get_contents($usuario->getFotoPerfil())),
                    
                ];
            }
            else{
                $usuariosArray[]=[
                    'nombre'=>$usuario->getUsername(),
                    'ganadas'=>$usuario->getPartidasGanadas(),
                    'perdidas'=>$usuario->getPartidasPerdidos(),
                    'empezadas'=>$usuario->getPartidasTotales(),
                    'terminadas'=>$usuario->getPartidasTerminadas(),
                    'color'=>$usuario->getColor(),
                    'posicion'=>0,
                    'foto'=>null
                ];
            }
            $response = new JsonResponse();
            $response->setData(
                $usuariosArray
            );
            return $response;
        }

}