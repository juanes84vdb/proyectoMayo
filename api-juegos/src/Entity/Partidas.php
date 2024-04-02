<?php

namespace App\Entity;

use App\Repository\PartidasRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\JsonResponse;

#[ORM\Entity(repositoryClass: PartidasRepository::class)]
class Partidas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'partidas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $jugador1 = null;

    #[ORM\ManyToOne(inversedBy: 'partidas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $jugador2 = null;


    #[ORM\Column]
    private ?bool $acabada = null;

    #[ORM\ManyToOne(inversedBy: 'ganadas')]
    private ?User $ganador = null;

    #[ORM\Column]
    private ?bool $turno = null;

    #[ORM\Column(nullable: true)]
    private ?array $filas = null;

    #[ORM\Column(nullable: true)]
    private ?int $fichas = null;

    #[ORM\ManyToOne(inversedBy: 'partidas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Juegos $tipo = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private ?array $cementerio1 = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private ?array $cementerio2 = null;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJugador1(): ?User
    {
        return $this->jugador1;
    }

    public function setJugador1(?User $jugador1): static
    {
        $this->jugador1 = $jugador1;

        return $this;
    }

    public function getJugador2(): ?User
    {
        return $this->jugador2;
    }

    public function setJugador2(?User $jugador2): static
    {
        $this->jugador2 = $jugador2;

        return $this;
    }

    public function isAcabada(): ?bool
    {
        return $this->acabada;
    }

    public function setAcabada(bool $acabada): static
    {
        $this->acabada = $acabada;

        return $this;
    }

    public function getGanador(): ?User
    {
        return $this->ganador;
    }

    public function setGanador(?User $ganador): static
    {
        $this->ganador = $ganador;

        return $this;
    }

    public function isTurno(): ?bool
    {
        return $this->turno;
    }

    public function setTurno(bool $turno): static
    {
        $this->turno = $turno;

        return $this;
    }

    public function getFilas(): ?array
    {
        return $this->filas;
    }

    public function setFilas(?array $filas): static
    {
        $this->filas = $filas;

        return $this;
    }

    public function getFichas(): ?int
    {
        return $this->fichas;
    }

    public function setFichas(?int $fichas): static
    {
        $this->fichas = $fichas;

        return $this;
    }

    public function getTipo(): ?Juegos
    {
        return $this->tipo;
    }

    public function setTipo(?Juegos $tipo): static
    {
        $this->tipo = $tipo;

        return $this;
    }

    public function getCementerio1(): ?array
    {
        return $this->cementerio1;
    }

    public function setCementerio1(?array $cementerio1): static
    {
        $this->cementerio1 = $cementerio1;

        return $this;
    }

    public function getCementerio2(): ?array
    {
        return $this->cementerio2;
    }

    public function setCementerio2(?array $cementerio2): static
    {
        $this->cementerio2 = $cementerio2;

        return $this;
    }

}
