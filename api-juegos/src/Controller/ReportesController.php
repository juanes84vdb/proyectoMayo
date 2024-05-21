<?php

namespace App\Controller;

use App\Entity\Reportes;
use App\Entity\User;
use App\Form\ReportesType;
use App\Repository\ReportesRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Partidas;
use App\Entity\Juegos;
use App\Form\PartidasType;
use App\Repository\PartidasRepository;
use App\Repository\JuegosRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Types\Types;

#[Route('/reportes')]
class ReportesController extends AbstractController {
    /**
 * This function handles the creation of new reports.
 *
 * @Route("/reportenew", name="app_reportes_new", methods={"POST", "PUT"})
 *
 * @param Request $request The request object containing the incoming request data.
 * @param EntityManagerInterface $entityManager The Doctrine entity manager for database operations.
 * @param UserRepository $usuariosRepository The repository for User entity.
 *
 * @return Response A JSON response indicating the success of the operation.
 */
#[Route('/reportenew', name: 'app_reportes_new', methods: ['POST', 'PUT'])]
    public function newReporte(Request $request,
        EntityManagerInterface $entityManager,
        UserRepository $usuariosRepository): Response {
        // Decode the request content as JSON and convert it to an associative array
        $data = json_decode($request -> getContent(), true);

        // Find the User entities for the reportado and reportador IDs
        $reportado = $entityManager -> getRepository(User:: class) -> find($data['reportado']);
        $reportador = $entityManager -> getRepository(User:: class) -> find($data['reportador']);

        // Create a new Reportes entity
        $Reporte = new Reportes();

        // Set the reportador, reportado, and descripcion properties of the Reportes entity
        $Reporte -> setReportador($reportador);
        $Reporte -> setReportado($reportado);
        $Reporte -> setDescripcion($data['motivo']);

        // Persist the Reportes entity to the database
        $entityManager -> persist($Reporte);

        // Flush the changes to the database
        $entityManager -> flush();

        // Prepare the response data
        $responseData = [
            'mensaje' => 'Datos actualizados correctamente'
        ];

        // Encode the response data as JSON
        $jsonResponse = json_encode($responseData);

        // Create a new Response object with the JSON response data and HTTP status code 200 (OK)
        $response = new Response($jsonResponse, Response:: HTTP_OK);

        // Set the Content-Type header to application/json
        $response -> headers -> set('Content-Type', 'application/json');

        // Return the response
        return $response;
    }
    /**
 * This function retrieves all reportes from the database and returns them as a JSON response.
 *
 * @Route("/all", name="app_reportes_all", methods={"GET"})
 *
 * @param Request $request The request object containing the incoming request data.
 * @param EntityManagerInterface $entityManager The Doctrine entity manager for database operations.
 * @param ReportesRepository $reportesRepository The repository for Reportes entity.
 *
 * @return Response A JSON response containing all reportes.
 */
#[Route('/all', name: 'app_reportes_all', methods: ['GET'])]
    public function reportes(Request $request,
        EntityManagerInterface $entityManager,
        ReportesRepository $reportesRepository): Response {
        // Fetch all reportes from the database
        $reportes = $reportesRepository -> findAll();

        // Initialize an empty array to store the reportes data
        $reportesArray = [];

        // Iterate over each reporte and prepare the data for the response
        foreach($reportes as $reporte) {
            $reportesArray[] = [
                'reportadoId' => $entityManager -> getRepository(User:: class) -> find($reporte -> getReportado()) -> getId(),
                'reportadorId' => $entityManager -> getRepository(User:: class) -> find($reporte -> getReportador()) -> getId(),
                'reportado' => $entityManager -> getRepository(User:: class) -> find($reporte -> getReportado()) -> getUsername(),
                'reportador' => $entityManager -> getRepository(User:: class) -> find($reporte -> getReportador()) -> getUsername(),
                'descripcion' => $reporte -> getDescripcion()
            ];
        }

        // Create a new JsonResponse object
        $response = new JsonResponse();

        // Set the data of the JsonResponse object to the reportesArray
        $response -> setData($reportesArray);

        // Return the JsonResponse object
        return $response;
    }
}