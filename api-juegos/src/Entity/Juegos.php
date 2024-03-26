<?php

namespace App\Entity;

use App\Repository\JuegosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JuegosRepository::class)]
class Juegos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $Nombre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $descripcion = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $imagen = null;

    #[ORM\OneToMany(targetEntity: Partidas::class, mappedBy: 'tipo', orphanRemoval: true)]
    private Collection $partidas;

    public function __construct()
    {
        $this->partidas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->Nombre;
    }

    public function setNombre(string $Nombre): static
    {
        $this->Nombre = $Nombre;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    public function setImagen($imagen): static
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * @return Collection<int, Partidas>
     */
    public function getPartidas(): Collection
    {
        return $this->partidas;
    }

    public function addPartida(Partidas $partida): static
    {
        if (!$this->partidas->contains($partida)) {
            $this->partidas->add($partida);
            $partida->setTipo($this);
        }

        return $this;
    }

    public function removePartida(Partidas $partida): static
    {
        if ($this->partidas->removeElement($partida)) {
            // set the owning side to null (unless already changed)
            if ($partida->getTipo() === $this) {
                $partida->setTipo(null);
            }
        }

        return $this;
    }
}
