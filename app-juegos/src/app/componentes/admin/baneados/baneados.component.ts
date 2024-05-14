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
  baneados: any;

  constructor(private usuariosService: UsuariosService) {
    this.recuperarYo();
    this.recuperarBaneados();
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
  }
  /**
 * Retrieves the list of banned users from the server.
 *
 * @returns {void}
 */
  recuperarBaneados() {
    // Subscribe to the `getBanedos` method of the `usuariosService`
    this.usuariosService.getBanedos().subscribe(
      // On successful response, assign the list of banned users to the `baneados` property
      (response) => {
        this.baneados = response;
        // Log the list of banned users to the console for debugging purposes
      },
      // On error response, handle the error appropriately (e.g., display an error message to the user)
      (error) => {
        // Handle the error
        //...
      }
    );
  }

  /**
 * Method to unban a user.
 *
 * @param {any} id - The id of the user to be unbanned.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully unbanned.
 */
  async desBanear(id: any) {
    // Prepare the data for the request
    const data = {
      id: id,
      ban: false
    }

    // Show a Swal alert to confirm the unban action
    const ban = await Swal.fire({
      title: 'Desbanear',
      text: 'Quieres Desbanear el usuario',
      icon: 'question',
      showCancelButton: true,
      cancelButtonAriaLabel: "Cancelar",
      confirmButtonText: '!De acuerdo!'
    })

    // If the user confirms the unban action, proceed with the request
    if (ban.isConfirmed) {
      // Make a request to the server to unban the user
      this.usuariosService.setBan(data).subscribe(
        (response) => {
          // Show a success message to the user
          Swal.fire({
            title: 'Baneado',
            text: 'El usuario ha sido Desbaneado',
            icon: 'success',
            confirmButtonText: '!De acuerdo!'
          }).then(() => {
            // Reload the page to reflect the changes
            window.location.reload();
          });
        }
      )
    }
  }
}
