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
    /**
     * This function retrieves all games from the database and returns them as a JSON response.
     *
     * @Route("/todos", name="app_juegos_todos", methods={"GET"})
     *
     * @param JuegosRepository $juegosRepository The repository for accessing game data.
     * @param Request $request The request object containing any parameters sent with the request.
     *
     * @return Response A JSON response containing an array of game objects.
     */
    #[Route('/todos', name: 'app_juegos_todos', methods: ['GET'])]
    public function todos(JuegosRepository $juegosRepository, Request $request): Response
    {
        // Fetch all games from the database
        $juegos = $juegosRepository->findAll();

        // Prepare an array to store the game data
        $juegosArray = [];

        // Iterate over the fetched games and prepare the game data for the response
        foreach ($juegos as $juego) {
            $juegosArray[] = [
                'id' => $juego->getId(),
                'nombre' => $juego->getNombre(),
                'descripcion' => $juego->getDescripcion(),
            ];
        }

        // Create a JSON response with the game data
        $response = new JsonResponse();
        $response->setData($juegosArray);

        // Return the JSON response
        return $response;
    }
}