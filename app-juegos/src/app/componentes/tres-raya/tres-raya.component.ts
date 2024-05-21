import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

class Player {
  estado: (0 | 1)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const ganadoestados = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
];

@Component({
  selector: 'app-tres-raya',
  templateUrl: './tres-raya.component.html',
  styleUrls: ['./tres-raya.component.scss']
})
export class TresRayaComponent {

  player1 = new Player('');
  player2 = new Player('');
  moveCounter = 0;
  jugador = this.player1;
  tablero: (null | 'x' | 'o')[] = [];
  id: any;
  yo: any;
  turno: boolean = true;
  ganador: boolean = false;
  fichas: number = 0;
  tablas: any = false;
  rival: any;
  moversiempre: any = false;
  mover: boolean = false;
  valores: any[] = [];
  load = false
  constructor(private partidasServices: PartidasService,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private authService: AuthService) {
    this.recuperarYo()
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('partida')!;
    });
    const data = {
      id: this.id
    };
  }

  /**
* Recupera el usuario
*/
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        if (response[0].ban == true) {
          localStorage.removeItem('loggedInKey');
          Swal.fire({
            title: 'Ban',
            text: 'Has sido banedo Hay que portarse bien',
            icon: 'info',
            confirmButtonText: '!De acuerdo!'
          }).then(() => {
            window.location.pathname = ""
          });
        }
        this.yo = response[0].id;
        const data = {
          id: this.id,
          jugador: this.yo
        };
        this.recuperarJuegos(data);
      },
      (error) => {
        Swal.fire({
          title: 'Sesion',
          text: 'La sesion ha caducado vueve a iniciar sesion',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
        window.location.pathname = "/login"
      });
  }

  /**
 * Retrieves the game data from the server and updates the game state.
 * @param id - The unique identifier of the game.
 */
  recuperarJuegos(id: any) {
    this.partidasServices.retornarTablero(id).subscribe(
      (response) => {
        // Check if there was an error loading the game
        if (response[0] == "error al cargar la partida") {
          Swal.fire({
            title: 'Sin permiso',
            text: 'No tienes permiso para jugar esta partida',
            icon: 'error',
            confirmButtonText: '¡De acuerdo!'
          }).then((result) => {
            window.location.pathname = ""
          })
        }

        // Update the game board with the retrieved data
        if (response[0].filas.length > 0) {
          this.tablero = response[0].filas;
        }
        else {
          this.tablero = [null, null, null, null, null, null, null, null, null];
        }

        // Update the game state
        this.turno = response[0].turno
        if (this.turno) {
          this.jugador = this.player1
        }
        else {
          this.jugador = this.player2
        }
        this.ganador = response[0].acabado
        this.id = response[0].id
        this.fichas = response[0].fichas
        this.rival = response[0].rival
        this.mover = response[0].mover
        this.load = true
        this.valores = response
      },
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
        window.location.pathname = ""
      }
    );
  }
  /**
 * Handles a player's move on the game board.
 *
 * @param index - The index of the cell where the player wants to place their mark.
 * @param player - The player making the move.
 *
 * @returns {void}
 */
  move(index: number, player: Player) {
    // Check if the cell is empty and it's the player's turn
    if (this.tablero[index] === null && (this.mover || this.moversiempre)) {
      // Update the player's state
      player.estado[index] = 1;

      // Increment the move counter
      this.moveCounter++;

      // Switch the turn
      this.turno = !this.turno;

      // Set the mover flag to false
      this.mover = false

      // Decrement the number of available moves
      this.fichas--

      // Check if there are no more moves left
      if (this.fichas == 0) {
        Swal.fire({
          title: 'Tablas',
          text: 'La partida a terminado en tablas',
          icon: 'info',
          confirmButtonText: '¡De acuerdo!'
        })

        // Set the game status to tablas and winner to true
        this.tablas = true;
        this.ganador = true;
      }

      // Place the player's mark on the board
      this.tablero[index] = this.turno ? 'o' : 'x';

      // Update the game state in the server
      this.valores[0].filas = this.tablero;
      this.valores[0].turno = this.turno;
      this.valores[0].fichas = this.fichas;
      this.valores[0].acabado = this.ganador;
      this.valores[0].tablas = this.tablas;
      this.partidasServices.updatePartida(this.valores).subscribe();

      // Check if the game has ended after this move
      if (this.moveCounter >= 5) {
        this.checkganado(this.jugador);
      }

      // Switch the current player
      this.jugador = this.jugador === this.player1 ? this.player2 : this.player1;
    }
  }

  /**
 * Checks if a player has won the game by comparing their state with winning states.
 *
 * @param player - The player whose state needs to be checked.
 *
 * @returns {void}
 */
  checkganado(player: Player) {
    // Iterate through all winning states
    for (const estado of ganadoestados) {
      let ganado = true;
      this.tablas = false; // Reset the tablas flag

      // Check if the player's state matches the winning state
      for (let i = 0; i < estado.length; i++) {
        if (estado[i] !== 0 && estado[i] !== player.estado[i]) {
          ganado = false; // If any cell doesn't match, the player hasn't won
          break;
        }
      }

      // If the player has won
      if (ganado) {
        // Show a winning message
        if (player == this.player1) {
          Swal.fire({
            title: 'Ganador',
            text: 'Han ganado las x',
            icon: 'info',
            confirmButtonText: '¡De acuerdo!'
          })
        }
        else {
          Swal.fire({
            title: 'Ganador',
            text: 'Han ganado las o',
            icon: 'info',
            confirmButtonText: '¡De acuerdo!'
          })
        }

        // Update the game state in the server
        this.valores[0].filas = this.tablero;
        this.valores[0].turno = this.turno;
        this.valores[0].fichas = this.fichas;
        this.valores[0].acabado = true; // Set the game as finished
        this.valores[0].tablas = this.tablas; // Set the tablas flag to false
        this.partidasServices.updatePartida(this.valores).subscribe();
      }
    }
  }
  /**
 * This function is used to check the password of the opponent.
 * It opens a Swal modal to ask for the password.
 * If the password is correct, it allows the player to always move.
 * If the password is incorrect, it shows an error message.
 *
 * @returns {Promise<void>} - A promise that resolves when the function is finished.
 */
  async checkRival() {
    // Open a Swal modal to ask for the password
    const { value: password } = await Swal.fire({
      title: "Contraseña",
      input: "password",
      inputLabel: "Introduce la contraseña de " + this.rival + " para continuar",
      inputPlaceholder: "Escribe la contraseña",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });

    // If the user entered a password
    if (password) {
      // Create credentials object with the entered password
      const credentials = { username: this.rival, password: password };

      // Try to log in with the entered credentials
      this.authService.login(credentials).subscribe(
        (response) => {
          // If the login is successful, show a success message and allow the player to always move
          Swal.fire({
            icon: 'success',
          })
          this.moversiempre = true;
        },
        (error) => {
          // If the login fails, show an error message
          Swal.fire({
            title: 'Error',
            text: 'Parece que la contraseña no es correcta',
            icon: 'error',
            confirmButtonText: '!De acuerdo!'
          })
        }
      )
    }
  }
}
