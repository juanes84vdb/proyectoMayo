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

        /**
     * Get the value of id.
     *
     * @return int|null The id
     */
    public function getId():?int
    {
        return $this->id;
    }

        /**
     * Get the value of descripcion.
     *
     * @return string|null The description of the report
     */
    public function getDescripcion():?string
    {
        return $this->descripcion;
    }

        /**
     * Set the value of descripcion.
     *
     * @param string $descripcion The description of the report
     *
     * @return static The current object (for fluent interface)
     */
    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

        /**
     * Get the user who reported the issue.
     *
     * @return User|null The user who reported the issue. If null, it means the report has no reporter.
     */
    public function getReportador():?User
    {
        return $this->reportador;
    }

        /**
     * Set the user who reported the issue.
     *
     * @param User|null $reportador The user who reported the issue. If null, it means the report has no reporter.
     *
     * @return static The current object (for fluent interface). This allows method chaining.
     *
     * @throws InvalidArgumentException If the provided argument is not an instance of User or null.
     */
    public function setReportador(?User $reportador): static
    {
        if (!$reportador instanceof User && $reportador!== null) {
            throw new InvalidArgumentException('The reportador must be an instance of User or null.');
        }

        $this->reportador = $reportador;

        return $this;
    }

        /**
     * Get the user who was reported.
     *
     * @return User|null The user who was reported. If null, it means the report has no reported user.
     */
    public function getReportado():?User
    {
        return $this->reportado;
    }

        /**
     * Set the user who was reported.
     *
     * @param User|null $reportado The user who was reported. If null, it means the report has no reported user.
     *
     * @return static The current object (for fluent interface). This allows method chaining.
     *
     * @throws InvalidArgumentException If the provided argument is not an instance of User or null.
     */
    public function setReportado(?User $reportado): static
    {
        if (!$reportado instanceof User && $reportado!== null) {
            throw new InvalidArgumentException('The reportado must be an instance of User or null.');
        }

        $this->reportado = $reportado;

        return $this;
    }
}
