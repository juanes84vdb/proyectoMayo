import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.scss'],
})
export class CabezeraComponent {
  inicio: boolean = false;
  yo: any = null;
  admin=true
  constructor(private usuariosService: UsuariosService) {
    this.recuperarYo();
    if (localStorage.getItem('loggedInKey')) {
      this.inicio = true;
    }
  }
  /**
   * This method is used to log out the user from the application.
   * It removes the 'loggedInKey' from the localStorage and redirects the user to the home page.
   *
   * @returns {void}
   */
  cerrarSesion(): void {
    localStorage.removeItem('loggedInKey');
    window.location.pathname = "";
  }

  /**
   * This method retrieves the user's profile information from the server.
   * It checks if the 'loggedInKey' exists in the localStorage before making the request.
   * If the 'loggedInKey' exists, it subscribes to the 'retornarYo' method of the 'UsuariosService'
   * and assigns the 'perfil' property of the first item in the response to the 'yo' property of the component.
   *
   * @returns {void}
   */
  recuperarYo() {
    if (localStorage.getItem("loggedInKey") !== null) {
      this.usuariosService.retornarYo().subscribe(response => {
        this.yo = response[0].perfil;
        if (response[0].ban==true){
          localStorage.removeItem('loggedInKey');
          Swal.fire({
            title: 'Ban',
            text: 'Has sido banedo Hay que portarse bien',
            icon: 'info',
            confirmButtonText: '!De acuerdo!'
          });
        }
      });
    }
  }
}
