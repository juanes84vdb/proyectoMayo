<?php

namespace App\Entity;

use App\Repository\PartidasRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

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
}
