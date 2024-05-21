import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  credentials = { username: '', password: '' };
  ver: boolean = false;
  constructor(private authService: AuthService) { }
  /**
 * Handles the registration form submission.
 * Validates the password and makes a request to register the user.
 * If successful, it calls the login method.
 * If the registration fails, it shows an error message.
 */
  onSubmit() {
    // Check if username and password are not empty
    if (this.credentials.username.length > 0 && this.credentials.password.length > 0) {
      // Validate password format
      if (!/[a-z]/.test(this.credentials.password) ||
        !/[A-Z]/.test(this.credentials.password) ||
        !/\d/.test(this.credentials.password) ||
        this.credentials.password.length < 6) {
        // Show error message if password format is invalid
        Swal.fire({
          title: 'Error',
          text: 'La contraseña debe tener una Mayuscula, minuscula, numero y tener al menos seis caracteres',
          icon: 'error',
          confirmButtonText: '¡De acuerdo!'
        })
      }
      else {
        // Register the user
        this.authService.register(this.credentials).subscribe(
          (response) => {
            // If registration is successful, call the login method
            this.login()
          },
          (error) => {
            // Show error message if registration fails
            Swal.fire({
              title: 'Usuario no disponible',
              text: 'El nombre de usuario no es valido',
              icon: 'warning',
              confirmButtonText: '¡De acuerdo!'
            })
          }
        );
      }
    }
    else {
      // Show error message if username or password is empty
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar un usuario y una contraseña',
        icon: 'error',
        confirmButtonText: '¡De acuerdo!'
      })
    }
  }

  /**
 * Handles the login process.
 * Makes a request to the server to authenticate the user.
 * If successful, it stores the token in local storage and shows a success message.
 * If the login fails, it shows an error message.
 */
  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Store the token in local storage
        localStorage.setItem('loggedInKey', response.token);

        // Show success message
        Swal.fire({
          title: 'Registro',
          text: 'Registro Exitoso',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => {
          // Redirect to home page
          window.location.pathname = ""
        })
      },
      (error) => {
        // Show error message
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => {
          // Redirect to home page
          window.location.pathname = ""
        })
      }
    );
  }
}
