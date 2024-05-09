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
class ReportesController extends AbstractController
{
    #[Route('/reportenew', name: 'app_reportes_new', methods: ['POST', 'PUT'])]
    public function newReporte(Request $request,
    EntityManagerInterface $entityManager,
    UserRepository $usuariosRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $reportado =$entityManager->getRepository(User::class)->find($data['reportado']);
        $reportador = $entityManager->getRepository(User::class)->find($data['reportador']);

        $Reporte=new Reportes();

        $Reporte->setReportador($reportador);
        $Reporte->setReportado($reportado);
        $Reporte->setDescripcion($data['motivo']);
        
        $entityManager->persist($Reporte);
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
