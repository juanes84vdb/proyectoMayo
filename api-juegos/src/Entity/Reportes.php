<?php

namespace App\Entity;

use App\Repository\ReportesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReportesRepository::class)]
class Reportes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $descripcion = null;

    #[ORM\ManyToOne(inversedBy: 'reportes')]
    private ?User $reportador = null;

    #[ORM\ManyToOne]
    private ?User $reportado = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getReportador(): ?User
    {
        return $this->reportador;
    }

    public function setReportador(?User $reportador): static
    {
        $this->reportador = $reportador;

        return $this;
    }

    public function getReportado(): ?User
    {
        return $this->reportado;
    }

    public function setReportado(?User $reportado): static
    {
        $this->reportado = $reportado;

        return $this;
    }
}
