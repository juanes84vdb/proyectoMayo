import { Component, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

interface usuario {
  name: string;
  id: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InicioComponent {
  juegos: any[] = [];
  usuarios: any[] = [];
  usuario: any;
  buscador: any = "";
  UserInterfece: usuario[] = [];
  selectedUsuario: usuario | undefined;
  constructor(
    private juegosService: JuegosService,
    private usuariosService: UsuariosService,
  ) {
    //window.close();
    this.usuario = "Elige usuario"
    this.recuperarJuegos();
    this.recuperarUsuarios()
  }

  /**
* Retrieves the list of games from the server.
*
* @returns {void}
*
* @throws Will throw an error if the server connection fails.
*
* @remarks
* This function uses the `juegosService` to fetch the list of games.
* If the server connection fails, it displays a warning message using `Swal`
* and removes the 'loggedInKey' from the local storage.
*
* @example
* ```typescript
* recuperarJuegos();
* ```
*/
  recuperarJuegos() {
    this.juegosService.retornar().subscribe(
      (response) => {
        this.juegos = response;
      },
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexión',
          text: 'No se ha podido conectar al servidor, intentelo más tarde. La sesión puede haber expirado',
          icon: 'warning',
          confirmButtonText: '!De acuerdo!'
        });
        localStorage.removeItem('loggedInKey');
      }
    );
  }

  /**
* Retrieves the list of users from the server.
*
* @returns {void}
*
* @throws Will throw an error if the server connection fails.
*
* @remarks
* This function uses the `usuariosService` to fetch the list of users.
* It then maps the user data to the `UserInterfece` format and stores it in the `UserInterfece` array.
* If the server connection fails, it removes the 'loggedInKey' from the local storage.
*
* @example
* ```typescript
* recuperarUsuarios();
* ```
*/
  recuperarUsuarios() {
    this.usuariosService.retornar().subscribe(
      (response) => {
        this.usuarios = response;
        for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].ban !== true) {
            this.UserInterfece.push({ name: this.usuarios[i].nombre, id: this.usuarios[i].id });
          }
        }
      },
      (error) => {
        localStorage.removeItem('loggedInKey');
      }
    );
  }

  /**
* Handles the form submission event.
* If a user is selected, it redirects to the user's profile page.
*
* @returns {void}
*
* @remarks
* This function checks if a user is selected (`this.selectedUsuario`).
* If a user is selected, it changes the window's location to the user's profile page using the user's ID.
* If no user is selected, it does nothing.
*
* @example
* ```typescript
* onSubmit();
* ```
*/
  onSubmit() {
    if (this.selectedUsuario) {
      window.location.pathname = "/usuario/" + this.selectedUsuario.id
    }
  }
}