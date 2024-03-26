<?php

namespace App\Controller;

use App\Entity\Partidas;
use App\Form\PartidasType;
use App\Repository\PartidasRepository;
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
    #[Route('/partida', name: 'app_partidas_partida', methods: ['GET'])]
    public function todosj(PartidasRepository $partidasrepository, Request $request): Response
    {
        $partidas=$partidasrepository->findAll();
        $partidasArray=[];
        foreach($partidas as $partida){
                $partidasArray[]=[
                    'filas' =>$partida->getFilas(),
                    'acabado' =>$partida->isAcabada(),
                    'turno'=>$partida->isTurno(),
                    'id'=>$partida->getId(),
                    'fichas'=>$partida->getFichas()
                ];
        }
            $response = new JsonResponse();
            $response->setData(
                $partidasArray
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

        $partida=$entityManager->getRepository(Partidas::class)->find($id);

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

    #[Route('/', name: 'app_partidas_index', methods: ['GET'])]
    public function index(PartidasRepository $partidasRepository): Response
    {
        return $this->render('partidas/index.html.twig', [
            'partidas' => $partidasRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_partidas_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $partida = new Partidas();
        $form = $this->createForm(PartidasType::class, $partida);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($partida);
            $entityManager->flush();

            return $this->redirectToRoute('app_partidas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('partidas/new.html.twig', [
            'partida' => $partida,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_partidas_show', methods: ['GET'])]
    public function show(Partidas $partida): Response
    {
        return $this->render('partidas/show.html.twig', [
            'partida' => $partida,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_partidas_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Partidas $partida, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PartidasType::class, $partida);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_partidas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('partidas/edit.html.twig', [
            'partida' => $partida,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_partidas_delete', methods: ['POST'])]
    public function delete(Request $request, Partidas $partida, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$partida->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($partida);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_partidas_index', [], Response::HTTP_SEE_OTHER);
    }
}
