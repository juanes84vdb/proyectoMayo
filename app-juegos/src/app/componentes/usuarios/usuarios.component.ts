import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ReportesService } from 'src/app/servicios/reportes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  perfil: any[] = []
  load = false;
  color: any
  foto: any
  id: any | null = null;
  yoId: number = 0;
  admin = false;
  constructor(private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private reportesService: ReportesService) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('usuario')!;
    });
    const data = {
      id: this.id
    }
    this.recuperarYo();
    this.recuperarUsuario(data);
  }

  /**
 * Retrieves the current logged-in user's information.
 *
 * @returns {void}
 *
 * @remarks
 * This method subscribes to the `retornarYo` method of the `usuariosService` to retrieve the logged-in user's information.
 * It checks if the user is an admin and sets the `admin` property accordingly.
 * If the user is banned, it removes the login key from local storage and shows a SweetAlert2 message.
 * It assigns the user's ID to the `yoId` property.
 *
 * @example
 * ```typescript
 * recuperarYo();
 * ```
 */
  recuperarYo() {
    // Subscribe to the `retornarYo` method of the `usuariosService`
    this.usuariosService.retornarYo().subscribe(
      // On successful response, assign the user's name and id to the `yo` and `yoId` properties respectively
      (response) => {
        if (response[0].rol[0] === "ROLE_ADMIN") {
          this.admin = true;
        }
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
        this.yoId = response[0].id;
        // Call the `recuperarUsuarios` method to retrieve the list of users
      },
      // On error response, set the `malLogin` flag to true
      (error) => {
      }
    );
  };

  /**
 * Retrieves a user's profile information based on the provided data.
 *
 * @param data - An object containing the user's ID.
 * @returns {void}
 *
 * @throws Will throw an error if the user ID is not provided or if there is an issue with the API request.
 *
 * @remarks
 * This method subscribes to the `usuario` method of the `usuariosService` to retrieve the user's profile information.
 * It assigns the retrieved profile information to the `perfil` property and the user's color to the `color` property.
 * If there is an error with the API request, it sets the `load` property to `true`.
 *
 * @example
 * ```typescript
 * const data = { id: 123 };
 * recuperarUsuario(data);
 * ```
 */
  recuperarUsuario(data: any): void {
    this.usuariosService.usuario(data).subscribe(
      (response) => {
        if (response[0].ban == true) {
          Swal.fire({
            title: 'Ban',
            text: 'Este usuario esta betado',
            icon: 'info',
            confirmButtonText: '!De acuerdo!',
          }).then(() => {
            window.location.pathname = ""
          });
        }
        this.perfil = response;
        this.color = response[0].color;
      },
      (error) => {
        this.load = true;
      }
    );
  }

  /**
 * Method to report a user.
 * It uses SweetAlert2 to prompt the user for a report reason.
 * Then it sends a report to the server with the provided reason, the reported user's ID, and the reporter's ID.
 * It shows a success message if the report is sent successfully, and an error message if there is a problem.
 *
 * @returns {Promise<void>} - A promise that resolves when the report is sent successfully or rejects if there is an error.
 *
 * @throws Will throw an error if there is a problem with the SweetAlert2 prompt or the API request.
 *
 * @remarks
 * This method uses the `Swal.fire` function from SweetAlert2 to prompt the user for a report reason.
 * It then constructs a report data object with the provided reason, the reported user's ID, and the reporter's ID.
 * It subscribes to the `newReporte` method of the `reportesService` to send the report to the server.
 * If the report is sent successfully, it shows a success message using `Swal.fire`.
 * If there is a problem with the report, it shows an error message using `Swal.fire`.
 *
 * @example
 * ```typescript
 * await reportar();
 * ```
 */
  async reportar() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Motivo",
      inputPlaceholder: "Escribe el motivo del reporte",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true,
      cancelButtonAriaLabel: "Cancelar",
    });
    if (text) {
      const data = {
        motivo: text,
        reportado: this.id,
        reportador: this.yoId
      }
      this.reportesService.newReporte(data).subscribe((response: any) => {
        Swal.fire({
          title: 'Reporte enviado',
          text: 'El reporte ha sido enviado correctamente',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        })
      },
        (error) => {
          Swal.fire({
            title: 'Reporte Fallido',
            text: 'Ha habido un problema con el reporte',
            icon: 'error',
            confirmButtonText: '¡De acuerdo!'
          })
        })
    }
  }

  /**
 * Method to ban a user.
 * It uses SweetAlert2 to prompt the user for confirmation before banning.
 * Then it sends a request to the server to ban the user with the provided ID.
 * It shows a success message if the ban is successful, and an error message if there is a problem.
 *
 * @param id - The ID of the user to be banned.
 * @returns {Promise<void>} - A promise that resolves when the ban is successful or rejects if there is an error.
 *
 * @throws Will throw an error if there is a problem with the SweetAlert2 prompt or the API request.
 *
 * @remarks
 * This method uses the `Swal.fire` function from SweetAlert2 to prompt the user for confirmation before banning.
 * It then constructs a ban data object with the provided ID and sets the `ban` property to `true`.
 * It subscribes to the `setBan` method of the `usuariosService` to send the ban request to the server.
 * If the ban is successful, it shows a success message using `Swal.fire`.
 * If there is a problem with the ban, it shows an error message using `Swal.fire`.
 *
 * @example
 * ```typescript
 * await banear(123);
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
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido llevar a cabo el ban',
            icon: 'error',
            confirmButtonText: '¡De acuerdo!'
          })
        }
      )
    }
  }
}
