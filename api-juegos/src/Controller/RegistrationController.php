<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Security\Http\Authenticator\FormLoginAuthenticator;

class RegistrationController extends AbstractController {
    /**
 * Registers a new user.
 *
 * @Route("/register", name="app_register", methods={"GET", "POST", "PUT"})
 *
 * @param Request $request The request object.
 * @param UserPasswordHasherInterface $userPasswordHasher The password hasher.
 * @param EntityManagerInterface $entityManager The entity manager.
 * @param UserAuthenticatorInterface $userAuthenticator The user authenticator.
 * @param FormLoginAuthenticator $formLoginAuthenticator The form login authenticator.
 *
 * @return Response A JSON response with a success message.
 */
    #[Route('/register', name: 'app_register', methods: ['GET', 'POST', 'PUT'])]
    public function register(Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager,
        UserAuthenticatorInterface $userAuthenticator,
        FormLoginAuthenticator $formLoginAuthenticator): Response {
        $data = json_decode($request -> getContent(), true);
        $user = new User();

        $user -> setUsername($data['username']);
        $user -> setPartidasTotales(0);
        $user -> setPartidasGanadas(0);
        $user -> setPartidasPerdidos(0);
        $user -> setPartidasTerminadas(0);
        $user -> setPassword(
            $userPasswordHasher -> hashPassword(
                $user,
                $data['password']
            )
        );
        $user -> setColor("#ffffff");
        $entityManager -> persist($user);
        $entityManager -> flush();

        $responseData = [
            'ensaje' => 'Usuario agregado correctamente'
        ];
        $jsonResponse = json_encode($responseData);
        $response = new Response($jsonResponse, Response:: HTTP_OK);
        $response -> headers -> set('Content-Type', 'application/json');

        return $response;
    }
}