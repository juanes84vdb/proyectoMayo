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
            if($juego->getImagen()!==null){
                $juegosArray[]=[
                    'id'=>$juego->getId(),
                    'nombre' => $juego->getNombre(),
                    'descripcion' => $juego->getDescripcion(),
                    'imagen' => base64_encode(stream_get_contents($juego->getImagen())),
                ];
            }
            else{
                $juegosArray[]=[
                    'id'=>$juego->getId(),
                    'nombre' => $juego->getNombre(),
                    'descripcion' => $juego->getDescripcion(),
                    'imagen'=>null
                ];
            }
        }
            $response = new JsonResponse();
            $response->setData(
                $juegosArray
            );
            return $response;
}

    #[Route('/', name: 'app_juegos_index', methods: ['GET'])]
    public function index(JuegosRepository $juegosRepository): Response
    {
        return $this->render('juegos/index.html.twig', [
            'juegos' => $juegosRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_juegos_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $juego = new Juegos();
        $form = $this->createForm(JuegosType::class, $juego);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $imagenFile = $form->get('imagen')->getData();
            if ($imagenFile) {
                $imagenData = file_get_contents($imagenFile->getPathname());
                $juego->setImagen($imagenData);
            }
            $entityManager->persist($juego);
            $entityManager->flush();

            return $this->redirectToRoute('app_juegos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('juegos/new.html.twig', [
            'juego' => $juego,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_juegos_show', methods: ['GET'])]
    public function show(Juegos $juego): Response
    {
        return $this->render('juegos/show.html.twig', [
            'juego' => $juego,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_juegos_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Juegos $juego, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(JuegosType::class, $juego);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $imagenFile = $form->get('imagen')->getData();
            if ($imagenFile) {
                $imagenData = file_get_contents($imagenFile->getPathname());
                $juego->setImagen($imagenData);
            }
            $entityManager->flush();

            return $this->redirectToRoute('app_juegos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('juegos/edit.html.twig', [
            'juego' => $juego,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_juegos_delete', methods: ['POST'])]
    public function delete(Request $request, Juegos $juego, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$juego->getId(), $request->request->get('_token'))) {
            $entityManager->remove($juego);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_juegos_index', [], Response::HTTP_SEE_OTHER);
    }
}