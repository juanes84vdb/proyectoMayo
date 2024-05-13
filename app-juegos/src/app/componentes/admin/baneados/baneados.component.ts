import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baneados',
  templateUrl: './baneados.component.html',
  styleUrls: ['./baneados.component.scss']
})
export class BaneadosComponent {

  admin: boolean = false;

  constructor(private usuariosService: UsuariosService) {
    this.recuperarYo();
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
        if (response[0].rol[0] === "ROLE_ADMIN") {
          this.admin = true;
        }
        else {
          Swal.fire({
            title: 'No eres Admin',
            text: 'No tienes permisos para estar aqui',
            icon: 'error',
            confirmButtonText: '!De acuerdo!'
          }).then(() => {
            window.location.pathname = ""
          });
        }

        // Call the `recuperarUsuarios` method to retrieve the list of users
      },
      // On error response, set the `malLogin` flag to true
      (error) => {
        window.location.pathname = ""
      }
    );
  };
}
