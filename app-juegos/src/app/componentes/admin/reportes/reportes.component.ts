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
  reportes:any
  filtroReportado:string = '';
  filtroMotivo:string = '';
  filtroReportador:string = '';
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
recuperarReportes(){
    this.reportesService.getReportes().subscribe(
      (response) => {
        this.reportes = response;
        console.log(this.reportes)
      }
    )
  }

  Motivofiltro(){
    return true
  }
  Reportadofiltro(){
    return true
  }
  Reportadorfiltro(){
    return true
  }
}
