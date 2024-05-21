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
        /**
     * This function retrieves all users from the database and returns them as a JSON response.
     *
     * @Route("/todos", name="app_usuarios_todos", methods={"GET"})
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object.
     *
     * @return Response A JSON response containing all users' id, name, and ban status.
     */
    #[Route('/todos', name: 'app_usuarios_todos', methods: ['GET'])]
    public function todos(UserRepository $usuariosRepository, Request $request): Response
    {
        // Fetch all users from the database
        $usuarios = $usuariosRepository->findAll();

        // Prepare an array to store user data
        $usuariosArray = [];

        // Iterate over each user and add their data to the array
        foreach ($usuarios as $usuario) {
            $usuariosArray[] = [
                'id' => $usuario->getId(),
                'nombre' => $usuario->getUsername(),
                'ban' => $usuario->isBan(),
            ];
        }

        // Create a JSON response with the user data
        $response = new JsonResponse();
        $response->setData($usuariosArray);

        // Return the JSON response
        return $response;
    }
        /**
     * This function retrieves the user's profile data and returns it as a JSON response.
     *
     * @Route("/perfil", name="app_perfil")
     *
     * @return Response A JSON response containing the user's profile data.
     */
    #[Route('/perfil', name: 'app_perfil')]
    public function index(): Response
    {
        // Get the current authenticated user
        $user = $this->getUser();

        // Prepare an array to store user data
        $usuario = [];

        // Check if the user has a profile picture
        if ($user->getFotoPerfil()!== null) {
            // If the user has a profile picture, encode it to base64 and add it to the user data array
            $usuario[] = [
                'usuario' => $user->getUserIdentifier(),
                'id' => $user->getId(),
                'ganadas' => $user->getPartidasGanadas(),
                'perdidas' => $user->getPartidasPerdidos(),
                'empezadas' => $user->getPartidasTotales(),
                'terminadas' => $user->getPartidasTerminadas(),
                'perfil' => base64_encode(stream_get_contents($user->getFotoPerfil())),
                'color' => $user->getColor(),
                'ban' => $user->isBan(),
                "rol" => $user->getRoles()
            ];
        } else {
            // If the user does not have a profile picture, add null to the user data array
            $usuario[] = [
                'usuario' => $user->getUserIdentifier(),
                'id' => $user->getId(),
                'ganadas' => $user->getPartidasGanadas(),
                'perdidas' => $user->getPartidasPerdidos(),
                'empezadas' => $user->getPartidasTotales(),
                'terminadas' => $user->getPartidasTerminadas(),
                'perfil' => null,
                'color' => $user->getColor(),
                'ban' => $user->isBan(),
                "rol" => $user->getRoles()
            ];
        }

        // Create a JSON response with the user data
        $response = new JsonResponse();
        $response->setData($usuario);

        // Return the JSON response
        return $response;
    }
            /**
     * This function retrieves all users from the database, calculates their ranking, and returns them as a JSON response.
     *
     * @Route("/ranking", name="app_ranking")
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object.
     *
     * @return Response A JSON response containing all users' ranking data.
     */
    #[Route('/ranking', name: 'app_ranking')]
    public function ranking(UserRepository $usuariosRepository, Request $request): Response
    {
        // Fetch all users from the database
        $usuarios = $usuariosRepository->findAll();

        // Prepare an array to store user data
        $usuariosArray = [];

        // Iterate over each user and add their data to the array
        foreach ($usuarios as $usuario) {
            // Check if the user has a profile picture
            if ($usuario->getFotoPerfil()!== null) {
                // If the user has a profile picture, encode it to base64 and add it to the user data array
                $usuariosArray[] = [
                    'nombre' => $usuario->getUsername(),
                    'ganadas' => $usuario->getPartidasGanadas(),
                    'perdidas' => $usuario->getPartidasPerdidos(),
                    'empezadas' => $usuario->getPartidasTotales(),
                    'terminadas' => $usuario->getPartidasTerminadas(),
                    'posicion' => 0, // Ranking position will be calculated later
                    'foto' => base64_encode(stream_get_contents($usuario->getFotoPerfil())),
                    'id' => $usuario->getId(),
                    'ban' => $usuario->isBan()
                ];
            } else {
                // If the user does not have a profile picture, add null to the user data array
                $usuariosArray[] = [
                    'nombre' => $usuario->getUsername(),
                    'ganadas' => $usuario->getPartidasGanadas(),
                    'perdidas' => $usuario->getPartidasPerdidos(),
                    'empezadas' => $usuario->getPartidasTotales(),
                    'terminadas' => $usuario->getPartidasTerminadas(),
                    'posicion' => 0, // Ranking position will be calculated later
                    'foto' => null,
                    'id' => $usuario->getId(),
                    'ban' => $usuario->isBan()
                ];
            }
        }

        // Create a JSON response with the user data
        $response = new JsonResponse();
        $response->setData($usuariosArray);

        // Return the JSON response
        return $response;
    }

            /**
     * This function updates the user's color in the database.
     *
     * @Route("/newcolor", name="app_usuarios_color", methods={"GET", "POST", "PUT"})
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object containing the user's id and new color.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     *
     * @return Response A JSON response indicating success or failure of the operation.
     */
    #[Route('/newcolor', name: 'app_usuarios_color', methods: ['GET', 'POST', 'PUT'])]
    public function color(UserRepository $usuariosRepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the user's id and new color
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $color = $data['color'];

        // Find the user in the database using the provided id
        $usuario=$entityManager->getRepository(User::class)->find($id);

        // Update the user's color
        $usuario->setColor($color);

        // Persist the changes in the database
        $entityManager->flush();
        
        // Prepare a response data array with a success message
        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];

        // Encode the response data to JSON format
        $jsonResponse = json_encode($responseData);

        // Create a new JSON response with the success message
        $response = new Response($jsonResponse, Response::HTTP_OK);

        // Set the content type of the response to JSON
        $response->headers->set('Content-Type', 'application/json');

        // Return the JSON response
        return $response;
    }

            /**
     * This function updates the user's profile picture in the database.
     *
     * @Route("/newfoto", name="app_usuarios_foto", methods={"GET", "POST", "PUT"})
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object containing the user's id and new profile picture.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     *
     * @return Response A JSON response indicating success or failure of the operation.
     */
    #[Route('/newfoto', name: 'app_usuarios_foto', methods: ['GET', 'POST', 'PUT'])]
    public function foto(UserRepository $usuariosRepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the user's id and new profile picture
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $foto = $data['foto'];

        // Find the user in the database using the provided id
        $usuario=$entityManager->getRepository(User::class)->find($id);

        // Check if the new profile picture is not empty
        if($foto!==false){
            // Decode the base64 encoded profile picture
            $imagenData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $foto));
        }
        else{
            // If the new profile picture is empty, set it to null
            $imagenData = null;
        }

        // Update the user's profile picture in the database
        $usuario->setFotoPerfil($imagenData);

        // Persist the changes in the database
        $entityManager->flush();
        
        // Prepare a response data array with a success message
        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];

        // Encode the response data to JSON format
        $jsonResponse = json_encode($responseData);

        // Create a new JSON response with the success message
        $response = new Response($jsonResponse, Response::HTTP_OK);

        // Set the content type of the response to JSON
        $response->headers->set('Content-Type', 'application/json');

        // Return the JSON response
        return $response;
    }

        /**
         * This function retrieves a single user from the database based on the provided id,
         * encodes their profile picture to base64, and returns their data as a JSON response.
         *
         * @Route("/filtro", name="app_usuarios_filtro", methods={"GET", "POST", "PUT"})
         *
         * @param UserRepository $usuariosRepository The repository for User entity.
         * @param Request $request The request object containing the user's id.
         * @param EntityManagerInterface $entityManager The entity manager for database operations.
         *
         * @return Response A JSON response containing the user's data.
         */
    #[Route('/filtro', name: 'app_usuarios_filtro', methods: ['GET', 'POST', 'PUT'])]
    public function usuario(UserRepository $usuariosRepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the user's id
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];

        // Find the user in the database using the provided id
        $usuario=$entityManager->getRepository(User::class)->find($id);

        // Prepare an array to store user data
        $usuariosArray = [];

        // Check if the user has a profile picture
        if($usuario->getFotoPerfil()!==null){
            // If the user has a profile picture, encode it to base64 and add it to the user data array
            $usuariosArray[]=[
                'nombre'=>$usuario->getUsername(),
                'ganadas'=>$usuario->getPartidasGanadas(),
                'perdidas'=>$usuario->getPartidasPerdidos(),
                'empezadas'=>$usuario->getPartidasTotales(),
                'terminadas'=>$usuario->getPartidasTerminadas(),
                'color'=>$usuario->getColor(),
                'posicion'=>0,
                'foto'=>base64_encode(stream_get_contents($usuario->getFotoPerfil())),
                'id'=>$usuario->getId(),
                'ban'=>$usuario->isBan()
            ];
        }
        else{
            // If the user does not have a profile picture, add null to the user data array
            $usuariosArray[]=[
                'nombre'=>$usuario->getUsername(),
                'ganadas'=>$usuario->getPartidasGanadas(),
                'perdidas'=>$usuario->getPartidasPerdidos(),
                'empezadas'=>$usuario->getPartidasTotales(),
                'terminadas'=>$usuario->getPartidasTerminadas(),
                'color'=>$usuario->getColor(),
                'posicion'=>0,
                'foto'=>null,
                'id'=>$usuario->getId(),
                'ban'=>$usuario->isBan()
            ];
        }

        // Create a JSON response with the user data
        $response = new JsonResponse();
        $response->setData(
            $usuariosArray
        );

        // Return the JSON response
        return $response;
    }
         /**
     * This function retrieves all users from the database and returns them as a JSON response.
     *
     * @Route("/todos", name="app_usuarios_todos", methods={"GET"})
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object.
     *
     * @return Response A JSON response containing all users' id, name, and ban status.
     */
    #[Route('/baneados', name: 'app_usuarios_baneados', methods: ['GET'])]
    public function baneados(UserRepository $usuariosRepository, Request $request): Response
    {
        // Fetch all users from the database
        $usuarios = $usuariosRepository->findAll();

        // Prepare an array to store user data
        $usuariosArray = [];

        // Iterate over each user and add their data to the array
        foreach ($usuarios as $usuario) {
            if($usuario->isBan()){
                $usuariosArray[] = [
                    'id' => $usuario->getId(),
                    'nombre' => $usuario->getUsername(),
                    'ban' => $usuario->isBan()
                ];
            }
        }

        // Create a JSON response with the user data
        $response = new JsonResponse();
        $response->setData($usuariosArray);

        // Return the JSON response
        return $response;
    }

        /**
     * This function updates the user's ban status in the database.
     *
     * @Route("/ban", name="app_usuarios_ban", methods={"GET", "POST", "PUT"})
     *
     * @param UserRepository $usuariosRepository The repository for User entity.
     * @param Request $request The request object containing the user's id and new ban status.
     * @param EntityManagerInterface $entityManager The entity manager for database operations.
     *
     * @return Response A JSON response indicating success or failure of the operation.
     */
    #[Route('/ban', name: 'app_usuarios_ban', methods: ['GET', 'POST', 'PUT'])]
    public function ban(UserRepository $usuariosRepository, 
    Request $request,
    EntityManagerInterface $entityManager): Response
    {
        // Decode the request content to get the user's id and new ban status
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $ban = $data['ban'];

        // Find the user in the database using the provided id
        $usuario=$entityManager->getRepository(User::class)->find($id);

        // Update the user's ban status
        $usuario->setBan($ban);

        // Persist the changes in the database
        $entityManager->flush();
        
        // Prepare a response data array with a success message
        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];

        // Encode the response data to JSON format
        $jsonResponse = json_encode($responseData);

        // Create a new JSON response with the success message
        $response = new Response($jsonResponse, Response::HTTP_OK);

        // Set the content type of the response to JSON
        $response->headers->set('Content-Type', 'application/json');

        // Return the JSON response
        return $response;
    }
}