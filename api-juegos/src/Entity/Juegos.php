<?php

namespace App\Entity;

use App\Repository\JuegosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JuegosRepository:: class)]
class Juegos {
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private?int $id = null;

    #[ORM\Column(length: 50)]
    private?string $Nombre = null;

    #[ORM\Column(length: 255, nullable: true)]
private ? string $descripcion = null;

    #[ORM\OneToMany(targetEntity: Partidas:: class, mappedBy: 'tipo', orphanRemoval: true)]
    private Collection $partidas;

public function __construct() {
    $this -> partidas = new ArrayCollection();
}

/**
* Get the value of id.
*
* @return int|null The id
*/
public function getId(): ?int {
    return $this -> id;
}

/**
* Get the value of Nombre.
*
* @return string|null The Nombre
*/
public function getNombre(): ?string {
    return $this -> Nombre;
}

/**
* Set the value of Nombre.
*
* @param string $Nombre The new name of the game
*
* @return static The current object (for fluent interface)
*/
public function setNombre(string $Nombre): static {
    $this -> Nombre = $Nombre;

    return $this;
}

/**
* Get the value of descripcion.
*
* @return string|null The description of the game. If null, it means no description is provided.
*/
public function getDescripcion(): ?string {
    return $this -> descripcion;
}

/**
* Set the value of descripcion.
*
* @param string|null $descripcion The new description of the game. If null, it means no description is provided.
*
* @return static The current object (for fluent interface).
*
* @throws InvalidArgumentException If the provided description is not a string or null.
*/
public function setDescripcion(?string $descripcion): static {
    if (!is_string($descripcion) && $descripcion !== null) {
        throw new InvalidArgumentException('The description must be a string or null.');
    }

    $this -> descripcion = $descripcion;

    return $this;
}


/**
* Get the collection of Partidas associated with this Juegos entity.
*
* @return Collection<int, Partidas> A collection of Partidas objects.
*
* @see Partidas
* @see addPartida()
* @see removePartida()
*/
public function getPartidas(): Collection {
    return $this -> partidas;
}

/**
 * Adds a Partidas entity to the collection of Partidas associated with this Juegos entity.
 *
 * @param Partidas $partida The Partidas entity to add.
 *
 * @return static The current object (for fluent interface).
 *
 * @throws LogicException If the Partidas entity is already associated with this Juegos entity.
 *
 * @see Partidas
 * @see removePartida()
 * @see getPartidas()
 */
public function addPartida(Partidas $partida): static {
    if (!$this -> partidas -> contains($partida)) {
        $this -> partidas -> add($partida);
        $partida -> setTipo($this);
    }

    return $this;
}

/**
* Removes a Partidas entity from the collection of Partidas associated with this Juegos entity.
*
* @param Partidas $partida The Partidas entity to remove.
*
* @return static The current object (for fluent interface).
*
* @throws LogicException If the Partidas entity is not associated with this Juegos entity.
*
* @see Partidas
* @see addPartida()
* @see getPartidas()
*/
public function removePartida(Partidas $partida): static {
    if ($this -> partidas -> removeElement($partida)) {
        // set the owning side to null (unless already changed)
        if ($partida -> getTipo() === $this) {
            $partida -> setTipo(null);
        }
    }
    return $this;
}
}
