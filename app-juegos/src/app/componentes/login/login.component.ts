import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  ver: boolean = false;
  constructor(private authService: AuthService) { }

  /**
   * Logs the user in using the given credentials.
   *
   * @param credentials - The username and password to use for authentication.
   * @returns A promise that resolves to the authentication response,
   * or rejects with an error.
   */
  /**
 * Handles the login form submission.
 * Validates the user input, sends a login request to the server,
 * and handles the response or error.
 */
  onSubmit() {
    // Check if username and password are provided
    if (this.credentials.username.length > 0 && this.credentials.password.length > 0) {
      // Send login request to the server
      this.authService.login(this.credentials).subscribe(
        // Handle successful login response
        (response) => {
          // Store the authentication token in local storage
          localStorage.setItem('loggedInKey', response.token);
          // Redirect to the home page
          window.location.pathname = "";
        },
        // Handle login error response
        (error) => {
          // Check if the error is due to too many failed login attempts
          if (error.error.message.includes('Too many failed login attempts')) {
            // Show a timeout error message
            Swal.fire({
              title: 'Timeout',
              text: 'Excedido el limite de intentos, intantalo en ' + error.error.message.substring(52, 54) + ' minutos',
              icon: 'error',
              confirmButtonText: '!De acuerdo!'
            })
          }
          else {
            // Show a generic error message
            Swal.fire({
              title: 'Error',
              text: 'Parece que las credenciales no son correctas',
              icon: 'error',
              confirmButtonText: '!De acuerdo!'
            })
          }
        }
      );
    }
    else {
      // Show a required fields error message
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar un usuario y una contraseña',
        icon: 'error',
        confirmButtonText: '!De acuerdo!'
      })
    }
  }
}