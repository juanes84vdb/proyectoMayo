import { Component } from '@angular/core';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent {
  partidas: any[] = [];

  yo: number = 0;
  constructor(private partidasServices: PartidasService,
    private usuariosService: UsuariosService
  ) {
    //  const interval = Rx.Observable.interval(100).mapTo(this.recuperarYo()).take(3);
    this.recuperarYo();
  }

  /**
 * This function retrieves the user's games from the server.
 *
 * @param data - An object containing the user's ID.
 * @param data.id - The ID of the user.
 * @param data.usuario - The ID of the user.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server connection fails or the session has expired.
 *
 * @remarks
 * This function uses the `PartidasUsuario` method from the `PartidasService` to fetch the user's games.
 * It subscribes to the observable returned by the method and updates the `partidas` array with the response.
 * If an error occurs during the server request, it displays a SweetAlert2 warning message and logs out the user.
 */
  recuperarPartidas(data: any) {
    this.partidasServices.PartidasUsuario(data).subscribe(
      (response) => {
        this.partidas = response;
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
      });
  }

  /**
 * This function retrieves the user's ID from the server.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server connection fails or the session has expired.
 *
 * @remarks
 * This function uses the `retornarYo` method from the `UsuariosService` to fetch the user's ID.
 * It subscribes to the observable returned by the method and updates the `yo` property with the response.
 * If an error occurs during the server request, it displays a SweetAlert2 warning message and logs out the user.
 */
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        if (response[0].ban==true){
          localStorage.removeItem('loggedInKey');
          Swal.fire({
            title: 'Ban',
            text: 'Has sido banedo Hay que portarse bien',
            icon: 'info',
            confirmButtonText: '!De acuerdo!'
          });
          window.location.pathname = "";
        }

        this.yo = response[0].id;
        const data = {
          id: null,
          usuario: this.yo
        };
        // Call the function to retrieve the user's games after retrieving the user's ID
        this.recuperarPartidas(data);
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
}