import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfil: any[] = []
  load = false;
  color: any
  foto: any
  constructor(private usuariosService: UsuariosService) {
    this.recuperarYo();
  }

  /**
 * Updates the user's profile color.
 *
 * @remarks
 * This function sends a request to the server to update the user's color.
 * It uses the `UsuariosService` to make the request and displays a success or error message using `Swal`.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server request fails.
 *
 * @example
 * ```typescript
 * const data = {
 *   color: '#FF0000',
 *   id: 12345
 * };
 * newcolor(data);
 * ```
 */
newcolor() {
    const data = {
      color: this.color,
      id: this.perfil[0].id
    }
    this.usuariosService.newcolor(data).subscribe(
      (response) => {
        Swal.fire({
          title: 'Actualizacion realizada',
          text: 'Color actualizado correctamente',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        })
      },
      (error) => {
        Swal.fire({
          title: 'Actualizacion no realizada',
          text: 'Ha habido un problema en la actualizacion intentelo de nuevo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
      }
    );
  }
/**
 * Handles the preview of a new profile picture.
 *
 * @remarks
 * This function reads the selected image file and converts it to a data URL.
 * The data URL is then stored in the `foto` property of the component.
 *
 * @param {any} event - The event object containing the file input data.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the FileReader API is not supported.
 *
 * @example
 * ```typescript
 * const event = {
 *   target: {
 *     files: [
 *       new File([''], 'example.jpg', { type: 'image/jpeg' })
 *     ]
 *   }
 * };
 * newfotopreview(event);
 * ```
 */
newfotopreview(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.foto = reader.result;
    }
  }
  /**
 * Updates the user's profile picture.
 *
 * @remarks
 * This function sends a request to the server to update the user's profile picture.
 * It uses the `UsuariosService` to make the request and displays a success or error message using `Swal`.
 * If the `foto` property is null, it sets it to false before sending the request.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server request fails.
 *
 * @example
 * ```typescript
 * const data = {
 *   foto: 'data:image/jpeg;base64,...',
 *   id: 12345
 * };
 * newfoto();
 * ```
 */
newfoto() {
    if (this.foto == null) {
      this.foto = false
    }
    const data = {
      foto: this.foto,
      id: this.perfil[0].id
    }
    this.usuariosService.newfoto(data).subscribe(
      (response) => {
        Swal.fire({
          title: 'Actualizacion realizada',
          text: 'Foto actualizado correctamente',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => { 
          window.location.reload();
        })
      },
      (error) => {
        Swal.fire({
          title: 'Actualizacion no realizada',
          text: 'Ha habido un problema en la actualizacion intentelo de nuevo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
      }
    );
  }
  /**
 * Retrieves the user's profile information.
 *
 * @remarks
 * This function sends a request to the server to retrieve the user's profile data.
 * It uses the `UsuariosService` to make the request and updates the `perfil` and `color` properties of the component.
 * If the user is banned, it removes the 'loggedInKey' from localStorage and displays a ban message using `Swal`.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server request fails.
 *
 * @example
 * ```typescript
 * recuperarYo();
 * ```
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
        }
        this.perfil = response;
        this.color = response[0].color;
      },
      (error) => {
        this.load = true;
      }
    );
  }
}
