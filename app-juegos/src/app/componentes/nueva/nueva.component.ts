import { Component } from '@angular/core';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

interface usuario {
  name: string;
  id: number;
}
interface juego {
  name: string;
  id: number;
}
@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.scss']
})
export class NuevaComponent {
  juegos: any[] = [];
  usuarios: any[] = [];
  yo: string = "";
  yoId: number = 0;
  load = false;
  UserInterfece: usuario[] = [];
  selectedUsuario: usuario | undefined;
  JuegoInterfece: juego[] = [];
  selectedJuego: juego | undefined;
  malLogin: boolean = false;
  constructor(private juegosService: JuegosService,
    private usuariosService: UsuariosService,
    private partidasServices: PartidasService
  ) {
    this.recuperarYo();
    this.recuperarJuegos();
  }
  /**
 * Retrieves the list of games from the server and populates the `juegos` and `JuegoInterfece` arrays.
 *
 * @returns {void}
 */
  recuperarJuegos() {
    // Subscribe to the `retornar` method of the `juegosService`
    this.juegosService.retornar().subscribe(response => {
      // Assign the response to the `juegos` array
      this.juegos = response;

      // Loop through the `juegos` array
      for (let i = 0; i < this.juegos.length; i++) {
        // Push an object with `name` and `id` properties to the `JuegoInterfece` array
        this.JuegoInterfece.push({ name: this.juegos[i].nombre, id: this.juegos[i].id });
      }
    });
  }
  /**
 * Retrieves the list of users from the server and populates the `usuarios` and `UserInterfece` arrays.
 * It also filters out the current user from the list of users.
 *
 * @returns {void}
 */
  recuperarUsuarios() {
    // Subscribe to the `retornar` method of the `usuariosService`
    this.usuariosService.retornar().subscribe(
      // On successful response, assign the response to the `usuarios` array
      (response) => {
        this.usuarios = response;

        // Loop through the `usuarios` array
        for (let i = 0; i < this.usuarios.length; i++) {
          // If the user's name is not the same as the current user,
          // push an object with `name` and `id` properties to the `UserInterfece` array
          if (this.usuarios[i].nombre !== this.yo && this.usuarios[i].ban !== true) {
            this.UserInterfece.push({ name: this.usuarios[i].nombre, id: this.usuarios[i].id });
          }
        }

        // Set the `load` flag to true
        this.load = true;
      },
      // On error response, display an error message and log out the user
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        });

        // Remove the logged-in key from local storage and redirect to the login page
        localStorage.removeItem('loggedInKey');
        window.location.pathname = "";
      }
    );
  }
  /**
 * Retrieves the current user's information from the server.
 *
 * @returns {void}
 */
  recuperarYo() {
    // Subscribe to the `retornarYo` method of the `usuariosService`
    this.usuariosService.retornarYo().subscribe(
      // On successful response, assign the user's name and id to the `yo` and `yoId` properties respectively
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
        this.yo = response[0].usuario;
        this.yoId = response[0].id;

        // Call the `recuperarUsuarios` method to retrieve the list of users
        this.recuperarUsuarios();
      },
      // On error response, set the `malLogin` flag to true
      (error) => {
        this.malLogin = true;
      }
    );
  };
  /**
 * Handles the form submission event.
 * Checks if both a user and a game have been selected.
 * If both are selected, it creates a new game with the selected user and game.
 *
 * @returns {void}
 */
  onSubmit() {
    // Check if a game has been selected
    if (this.selectedJuego) {
      // Check if a user has been selected
      if (this.selectedUsuario && this.selectedJuego) {
        // Prepare the data for the new game
        const data = {
          jugador1: this.yoId, // The ID of the current user
          jugador2: this.selectedUsuario.id, // The ID of the selected user
          tipo: this.selectedJuego.id // The ID of the selected game
        }
        // Call the method to create a new game with the prepared data
        this.nuevaPartida(data);
      }
    }
  }


  /**
   * Creates a new game with the provided data.
   *
   * @param data - An object containing the necessary information for creating a new game.
   * @param data.jugador1 - The ID of the current user.
   * @param data.jugador2 - The ID of the selected user.
   * @param data.tipo - The ID of the selected game.
   *
   * @returns {void}
   *
   * @throws Will throw an error if the `partidasServices.newPartida` method fails.
   *
   * @example
   * const data = {
   *   jugador1: 1,
   *   jugador2: 2,
   *   tipo: 3
   * };
   * nuevaPartida(data);
   */
  nuevaPartida(data: any) {
    this.partidasServices.newPartida(data).subscribe(response => {
      Swal.fire({
        title: 'Ok',
        text: 'Partida Creada Correctamente',
        icon: 'success',
        confirmButtonText: '¡De acuerdo!'
      }).then((result) => {
        if(this.selectedJuego){
          window.location.pathname = "partidas/"+this.selectedJuego.name
        }
      })
    });
  }
}
