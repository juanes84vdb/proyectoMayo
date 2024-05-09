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



        /**
     * Get the ID of the Partida entity.
     *
     * @return int|null The ID of the Partida entity, or null if not set.
     */
    public function getId(): ?int
    {
        return $this->id;
    }

        /**
     * Get the first player of the Partida entity.
     *
     * @return User|null The first player of the Partida entity, or null if not set.
     */
    public function getJugador1(): ?User
    {
        return $this->jugador1;
    }

        /**
     * Set the first player of the Partida entity.
     *
     * @param User|null $jugador1 The first player of the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setJugador1(?User $jugador1): static
    {
        $this->jugador1 = $jugador1;

        return $this;
    }

        /**
     * Get the second player of the Partida entity.
     *
     * @return User|null The second player of the Partida entity, or null if not set.
     */
    public function getJugador2(): ?User
    {
        return $this->jugador2;
    }

        /**
     * Set the second player of the Partida entity.
     *
     * @param User|null $jugador2 The second player of the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setJugador2(?User $jugador2): static
    {
        $this->jugador2 = $jugador2;

        return $this;
    }

        /**
     * Get the status of whether the Partida is finished or not.
     *
     * @return bool|null The status of whether the Partida is finished or not, or null if not set.
     */
    public function isAcabada(): ?bool
    {
        return $this->acabada;
    }

        /**
     * Set the status of whether the Partida is finished or not.
     *
     * @param bool $acabada The status of whether the Partida is finished or not.
     *
     * @return static The Partidas entity instance.
     */
    public function setAcabada(bool $acabada): static
    {
        $this->acabada = $acabada;

        return $this;
    }

        /**
     * Get the winner of the Partida entity.
     *
     * @return User|null The winner of the Partida entity, or null if not set.
     */
    public function getGanador(): ?User
    {
        return $this->ganador;
    }

        /**
     * Set the winner of the Partida entity.
     *
     * @param User|null $ganador The winner of the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setGanador(?User $ganador): static
    {
        $this->ganador = $ganador;

        return $this;
    }

        /**
     * Checks if the Partida is currently the player's turn.
     *
     * @return bool|null The status of whether the Partida is the player's turn, or null if not set.
     */
    public function isTurno(): ?bool
    {
        return $this->turno;
    }

        /**
     * Set the status of whether the Partida is the player's turn or not.
     *
     * @param bool $turno The status of whether the Partida is the player's turn.
     *
     * @return static The Partidas entity instance.
     */
    public function setTurno(bool $turno): static
    {
        $this->turno = $turno;

        return $this;
    }

        /**
     * Get the array of filas in the Partida entity.
     *
     * @return array|null The array of filas in the Partida entity, or null if not set.
     */
    public function getFilas(): ?array
    {
        return $this->filas;
    }

        /**
     * Set the array of filas in the Partida entity.
     *
     * @param array|null $filas The array of filas in the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setFilas(?array $filas): static
    {
        $this->filas = $filas;

        return $this;
    }

        /**
     * Get the number of fichas in the Partida entity.
     *
     * @return int|null The number of fichas in the Partida entity, or null if not set.
     */
    public function getFichas(): ?int
    {
        return $this->fichas;
    }

        /**
     * Set the number of fichas in the Partida entity.
     *
     * @param int|null $fichas The number of fichas in the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setFichas(?int $fichas): static
    {
        $this->fichas = $fichas;

        return $this;
    }

        /**
     * Get the type of game associated with the Partida entity.
     *
     * @return Juegos|null The type of game associated with the Partida entity, or null if not set.
     */
    public function getTipo():?Juegos
    {
        return $this->tipo;
    }

        /**
     * Set the type of game associated with the Partida entity.
     *
     * @param Juegos|null $tipo The type of game associated with the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     */
    public function setTipo(?Juegos $tipo): static
    {
        $this->tipo = $tipo;

        return $this;
    }

        /**
     * Get the cementerio1 of the Partida entity.
     *
     * @return array|null The cementerio1 of the Partida entity, or null if not set.
     *
     */
    public function getCementerio1():?array
    {
        return $this->cementerio1;
    }

        /**
     * Set the cementerio1 of the Partida entity.
     *
     * @param array|null $cementerio1 The cementerio1 of the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     *
     * @throws InvalidArgumentException If the provided argument is not of type array or null.
     */
    public function setCementerio1(?array $cementerio1): static
    {
        if (!is_array($cementerio1) && $cementerio1!== null) {
            throw new InvalidArgumentException('The cementerio1 must be of type array or null.');
        }

        $this->cementerio1 = $cementerio1;

        return $this;
    }

        /**
     * Get the cementerio2 of the Partida entity.
     *
     * @return array|null The cementerio2 of the Partida entity, or null if not set.
     */
    public function getCementerio2():?array
    {
        return $this->cementerio2;
    }

        /**
     * Set the cementerio2 of the Partida entity.
     *
     * @param array|null $cementerio2 The cementerio2 of the Partida entity, or null if not set.
     *
     * @return static The Partidas entity instance.
     *
     * @throws InvalidArgumentException If the provided argument is not of type array or null.
     */
    public function setCementerio2(?array $cementerio2): static
    {
        if (!is_array($cementerio2) && $cementerio2!== null) {
            throw new InvalidArgumentException('The cementerio2 must be of type array or null.');
        }

        $this->cementerio2 = $cementerio2;

        return $this;
    }

}
