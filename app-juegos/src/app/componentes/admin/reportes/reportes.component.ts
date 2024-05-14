import { Component } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  admin: boolean = false;
  reportes: any;
  id: any
  filtroReportado: string = '';
  filtroMotivo: string = '';
  filtroReportador: string = '';
  constructor(private usuariosService: UsuariosService,
    private reportesService: ReportesService
  ) {
    this.recuperarYo();
    this.recuperarReportes();
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
        this.id = response[0].id
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
 * Retrieves the list of reports from the server.
 *
 * @returns {void}
 *
 * @remarks
 * This method subscribes to the `getReportes` method of the `reportesService`
 * and assigns the response to the `reportes` property.
 *
 * @example
 * ```typescript
 * recuperarReportes();
 * // After the method execution, `this.reportes` will contain the list of reports
 * ```
 */
  /**
   * Retrieves the list of reports from the server.
   *
   * @returns {void}
   *
   * @remarks
   * This method subscribes to the `getReportes` method of the `reportesService`
   * and assigns the response to the `reportes` property.
   *
   * @example
   * ```typescript
   * recuperarReportes();
   * // After the method execution, `this.reportes` will contain the list of reports
   * ```
   */
  recuperarReportes() {
    this.reportesService.getReportes().subscribe(
      (response) => {
        this.reportes = response;
      }
    )
  }

  /**
 * Bans a user based on the provided user ID.
 *
 * @param id - The ID of the user to be banned.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is successfully banned.
 *
 * @remarks
 * This method displays a confirmation dialog using SweetAlert2 to ensure the user's intention to ban the user.
 * If the user confirms the ban, it sends a request to the server to set the user's ban status to true.
 * After the ban is set, it displays a success message using SweetAlert2.
 *
 * @example
 * ```typescript
 * banear(123);
 * // After the method execution, the user with ID 123 will be banned.
 * ```
 */
  async banear(id: any) {
    const data = {
      id: id,
      ban: true
    }
    const ban = await Swal.fire({
      title: 'Banear',
      text: 'Quieres Banear el usuario',
      icon: 'question',
      showCancelButton: true,
      cancelButtonAriaLabel: "Cancelar",
      confirmButtonText: '!De acuerdo!'
    })
    if (ban.isConfirmed) {
      this.usuariosService.setBan(data).subscribe(
        (response) => {
          Swal.fire({
            title: 'Baneado',
            text: 'El usuario ha sido baneado',
            icon: 'success',
            confirmButtonText: '!De acuerdo!'
          })
        }
      )
    }
  }
}
