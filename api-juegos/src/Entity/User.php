<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository:: class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface {
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private?int $id = null;

    #[ORM\Column(length: 180)]
    private?string $username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
private ? string $password = null;

    #[ORM\OneToMany(targetEntity: Partidas:: class, mappedBy: 'jugador1', orphanRemoval: true)]
    private Collection $partidas;

    #[ORM\OneToMany(targetEntity: Partidas:: class, mappedBy: 'ganador')]
    private Collection $ganadas;

    #[ORM\Column]
private ? int $partidas_totales = null;

    #[ORM\Column]
private ? int $partidas_ganadas = null;

    #[ORM\Column]
private ? int $partidas_perdidos = null;

    #[ORM\Column]
private ? int $partidas_terminadas = null;

    #[ORM\Column(type: Types:: BLOB, nullable: true)]
    private $fotoPerfil = null;

    #[ORM\Column(length: 10, nullable: true)]
private ? string $color = null;

    #[ORM\Column(nullable: true)]
private ? bool $ban = null;

    #[ORM\OneToMany(targetEntity: Reportes:: class, mappedBy: 'reportador')]
    private Collection $reportes;

public function __construct() {
    $this -> partidas = new ArrayCollection();
    $this -> ganadas = new ArrayCollection();
    $this -> reportes = new ArrayCollection();
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
* Returns the username used to authenticate the user.
*
* @return string|null The username
*/
public function getUsername(): ?string {
    return $this -> username;
}

/**
* Set the username used to authenticate the user.
*
* @param string $username The username
* @return static The current object (for fluent interface)
*/
public function setUsername(string $username): static {
    $this -> username = $username;

    return $this;
}

/**
 * A visual identifier that represents this user.
 *
 * @see UserInterface
 * 
 * @return string The user identifier
 */
public function getUserIdentifier(): string {
    return (string) $this -> username;
}

/**
 * @see UserInterface
 * @return list<string>
 */
public function getRoles(): array {
    $roles = $this -> roles;
    // guarantee every user at least has ROLE_USER
    $roles[] = 'ROLE_USER';

    return array_unique($roles);
}

/**
 * Set the roles used to authenticate the user.
 *
 * @param list<string> $roles
 * @return static The current object (for fluent interface)
 *
 * @throws InvalidArgumentException If the provided roles are not strings
 */
public function setRoles(array $roles): static {
    // Ensure all roles are strings
    foreach($roles as $role) {
        if (!is_string($role)) {
            throw new InvalidArgumentException('All roles must be strings.');
        }
    }

    $this -> roles = $roles;

    return $this;
}
/**
 * Returns the hashed password used to authenticate the user.
 *
 * @return string The hashed password
 * @see PasswordAuthenticatedUserInterface
 */
/**
* Returns the hashed password used to authenticate the user.
*
* @return string The hashed password
* @see PasswordAuthenticatedUserInterface
*/
public function getPassword(): string {
    return $this -> password;
}

/**
* Set the hashed password used to authenticate the user.
*
* @param string $password The hashed password
* @return static The current object (for fluent interface)
*/
public function setPassword(string $password): static {
    $this -> password = $password;

    return $this;
}

/**
 * Erase sensitive data in the user instance.
 *
 * This method is called whenever the authentication information of a user is cleared.
 * This happens, for example, when a user logs out.
 *
 * @see UserInterface
 */
public function eraseCredentials(): void {
    // If you store any temporary, sensitive data on the user, clear it here
    // $this->plainPassword = null;
}

/**
 * Get the collection of Partidas where the user is the jugador1.
 *
 * @return Collection<int, Partidas> The collection of Partidas
 */
public function getPartidas(): Collection {
    return $this -> partidas;
}

/**
* Adds a Partida to the collection of Partidas where the user is the jugador1.
*
* @param Partidas $partida The Partida to add
* @return static The current object (for fluent interface)
*/
public function addPartida(Partidas $partida): static {
    // Check if the Partida is not already in the collection
    if (!$this -> partidas -> contains($partida)) {
        // Add the Partida to the collection
        $this -> partidas -> add($partida);
        // Set the jugador1 of the Partida to the current user
        $partida -> setJugador1($this);
    }

    // Return the current object for fluent interface
    return $this;
}

/**
* Removes a Partida from the collection of Partidas where the user is the jugador1.
*
* @param Partidas $partida The Partida to remove
* @return static The current object (for fluent interface)
*/
public function removePartida(Partidas $partida): static {
    // Check if the Partida is in the collection
    if ($this -> partidas -> removeElement($partida)) {
        // If the removed Partida was the jugador1 of the current user, set the jugador1 to null
        if ($partida -> getJugador1() === $this) {
            $partida -> setJugador1(null);
        }
    }

    // Return the current object for fluent interface
    return $this;
}


/**
* Get the collection of Partidas where the user is the ganador.
*
* @return Collection<int, Partidas> The collection of Partidas
*/
public function getGanadas(): Collection {
    return $this -> ganadas;
}

/**
* Adds a Partida to the collection of Partidas where the user is the ganador.
*
* @param Partidas $ganada The Partida to add
* @return static The current object (for fluent interface)
*
* @throws LogicException If the provided Partida is already in the collection
*/
public function addGanada(Partidas $ganada): static {
    // Check if the Partida is not already in the collection
    if (!$this -> ganadas -> contains($ganada)) {
        // Add the Partida to the collection
        $this -> ganadas -> add($ganada);
        // Set the ganador of the Partida to the current user
        $ganada -> setGanador($this);
    } else {
        // If the Partida is already in the collection, throw a LogicException
        throw new LogicException('The provided Partida is already in the collection.');
    }

    // Return the current object for fluent interface
    return $this;
}

/**
* Removes a Partida from the collection of Partidas where the user is the ganador.
*
* @param Partidas $ganada The Partida to remove
* @return static The current object (for fluent interface)
*/
public function removeGanada(Partidas $ganada): static {
    // Check if the Partida is in the collection
    if ($this -> ganadas -> removeElement($ganada)) {
        // If the removed Partida was the ganador of the current user, set the ganador to null
        if ($ganada -> getGanador() === $this) {
            $ganada -> setGanador(null);
        }
    }

    // Return the current object for fluent interface
    return $this;
}

/**
* Get the total number of games played by the user.
*
* @return int|null The total number of games played by the user
*/
public function getPartidasTotales(): ?int {
    return $this -> partidas_totales;
}

/**
* Set the total number of games played by the user.
*
* @param int $partidas_totales The total number of games played by the user
* @return static The current object (for fluent interface)
*/
public function setPartidasTotales(int $partidas_totales): static {
    $this -> partidas_totales = $partidas_totales;

    return $this;
}

/**
* Get the total number of games won by the user.
*
* @return int|null The total number of games won by the user
*/
public function getPartidasGanadas(): ?int {
    return $this -> partidas_ganadas;
}

/**
* Set the total number of games won by the user.
*
* @param int $partidas_ganadas The total number of games won by the user
* @return static The current object (for fluent interface)
*/
public function setPartidasGanadas(int $partidas_ganadas): static {
    $this -> partidas_ganadas = $partidas_ganadas;

    return $this;
}

/**
* Get the total number of games lost by the user.
*
* @return int|null The total number of games lost by the user
*/
public function getPartidasPerdidos(): ?int {
    return $this -> partidas_perdidos;
}

/**
* Set the total number of games lost by the user.
*
* @param int $partidas_perdidos The total number of games lost by the user
* @return static The current object (for fluent interface)
*/
public function setPartidasPerdidos(int $partidas_perdidos): static {
    $this -> partidas_perdidos = $partidas_perdidos;

    return $this;
}

/**
* Get the total number of games terminated by the user.
*
* @return int|null The total number of games terminated by the user
*/
public function getPartidasTerminadas(): ?int {
    return $this -> partidas_terminadas;
}

/**
* Set the total number of games terminated by the user.
*
* @param int $partidas_terminadas The total number of games terminated by the user
* @return static The current object (for fluent interface)
*/
public function setPartidasTerminadas(int $partidas_terminadas): static {
    $this -> partidas_terminadas = $partidas_terminadas;

    return $this;
}

/**
* Get the user's profile picture.
*
* This method retrieves the user's profile picture stored in the database.
*
* @return mixed The user's profile picture. The type of the returned value depends on the storage mechanism used.
*               In this case, it is assumed that the profile picture is stored as a BLOB (Binary Large OBject) in the database.
*
* @throws Exception If an error occurs while retrieving the profile picture.
*/
public function getFotoPerfil() {
    return $this -> fotoPerfil;
}

/**
* Set the user's profile picture.
*
* This method sets the user's profile picture to the provided value.
* The profile picture is expected to be stored as a BLOB (Binary Large OBject) in the database.
*
* @param mixed $fotoPerfil The user's profile picture. The type of the provided value depends on the storage mechanism used.
*                         In this case, it is assumed that the profile picture is a BLOB.
*
* @return static The current object (for fluent interface).
*
* @throws Exception If an error occurs while setting the profile picture.
*/
public function setFotoPerfil($fotoPerfil): static {
    $this -> fotoPerfil = $fotoPerfil;

    return $this;
}

/**
* Get the user's chosen color.
*
* This method retrieves the user's chosen color for their profile.
*
* @return string|null The user's chosen color. If the color is not set, it returns null.
*/
public function getColor(): ?string {
    return $this -> color;
}

/**
* Set the user's chosen color.
*
* This method sets the user's chosen color for their profile.
*
* @param string|null $color The user's chosen color. If the color is not set, it should be null.
* @return static The current object (for fluent interface).
*/
public function setColor(?string $color): static {
    $this -> color = $color;

    return $this;
}

/**
* Checks if the user is banned.
*
* This method returns the ban status of the user.
* If the user is banned, it returns true; otherwise, it returns false.
*
* @return bool|null The ban status of the user. If the ban status is not set, it returns null.
*/
public function isBan(): ?bool {
    return $this -> ban;
}

/**
* Sets the ban status of the user.
*
* This method sets the ban status of the user. If the user is banned, it should be set to true.
* If the user is not banned, it should be set to false or null.
*
* @param bool|null $ban The ban status of the user. If the ban status is not set, it should be null.
* @return static The current object (for fluent interface).
*/
public function setBan(?bool $ban): static {
    $this -> ban = $ban;

    return $this;
}

/**
 * Get the collection of Reportes where the user is the reportador.
 *
 * @return Collection<int, Reportes> The collection of Reportes
 */
public function getReportes(): Collection {
    return $this -> reportes;
}

/**
* Adds a Reporte to the collection of Reportes where the user is the reportador.
*
* @param Reportes $reporte The Reporte to add
* @return static The current object (for fluent interface)
*
* @throws LogicException If the provided Reporte is already in the collection
*/
public function addReporte(Reportes $reporte): static {
    // Check if the Reporte is not already in the collection
    if (!$this -> reportes -> contains($reporte)) {
        // Add the Reporte to the collection
        $this -> reportes -> add($reporte);
        // Set the reportador of the Reporte to the current user
        $reporte -> setReportador($this);
    } else {
        // If the Reporte is already in the collection, throw a LogicException
        throw new LogicException('The provided Reporte is already in the collection.');
    }

    // Return the current object for fluent interface
    return $this;
}

/**
* Removes a Reporte from the collection of Reportes where the user is the reportador.
*
* @param Reportes $reporte The Reporte to remove
* @return static The current object (for fluent interface)
*/
public function removeReporte(Reportes $reporte): static {
    // Check if the Reporte is in the collection
    if ($this -> reportes -> removeElement($reporte)) {
        // If the removed Reporte was the reportador of the current user, set the reportador to null
        if ($reporte -> getReportador() === $this) {
            $reporte -> setReportador(null);
        }
    }

    // Return the current object for fluent interface
    return $this;
}

}
