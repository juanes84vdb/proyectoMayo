<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\OneToMany(targetEntity: Partidas::class, mappedBy: 'jugador1', orphanRemoval: true)]
    private Collection $partidas;

    #[ORM\OneToMany(targetEntity: Partidas::class, mappedBy: 'ganador')]
    private Collection $ganadas;

    #[ORM\Column]
    private ?int $partidas_totales = null;

    #[ORM\Column]
    private ?int $partidas_ganadas = null;

    #[ORM\Column]
    private ?int $partidas_perdidos = null;

    #[ORM\Column]
    private ?int $partidas_terminadas = null;

    public function __construct()
    {
        $this->partidas = new ArrayCollection();
        $this->ganadas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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
            $partida->setJugador1($this);
        }

        return $this;
    }

    public function removePartida(Partidas $partida): static
    {
        if ($this->partidas->removeElement($partida)) {
            // set the owning side to null (unless already changed)
            if ($partida->getJugador1() === $this) {
                $partida->setJugador1(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partidas>
     */
    public function getGanadas(): Collection
    {
        return $this->ganadas;
    }

    public function addGanada(Partidas $ganada): static
    {
        if (!$this->ganadas->contains($ganada)) {
            $this->ganadas->add($ganada);
            $ganada->setGanador($this);
        }

        return $this;
    }

    public function removeGanada(Partidas $ganada): static
    {
        if ($this->ganadas->removeElement($ganada)) {
            // set the owning side to null (unless already changed)
            if ($ganada->getGanador() === $this) {
                $ganada->setGanador(null);
            }
        }

        return $this;
    }

    public function getPartidasTotales(): ?int
    {
        return $this->partidas_totales;
    }

    public function setPartidasTotales(int $partidas_totales): static
    {
        $this->partidas_totales = $partidas_totales;

        return $this;
    }

    public function getPartidasGanadas(): ?int
    {
        return $this->partidas_ganadas;
    }

    public function setPartidasGanadas(int $partidas_ganadas): static
    {
        $this->partidas_ganadas = $partidas_ganadas;

        return $this;
    }

    public function getPartidasPerdidos(): ?int
    {
        return $this->partidas_perdidos;
    }

    public function setPartidasPerdidos(int $partidas_perdidos): static
    {
        $this->partidas_perdidos = $partidas_perdidos;

        return $this;
    }

    public function getPartidasTerminadas(): ?int
    {
        return $this->partidas_terminadas;
    }

    public function setPartidasTerminadas(int $partidas_terminadas): static
    {
        $this->partidas_terminadas = $partidas_terminadas;

        return $this;
    }
}
