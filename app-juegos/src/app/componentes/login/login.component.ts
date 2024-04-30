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
  ver:boolean=false;
  constructor(private authService: AuthService) {}

  /**
   * Logs the user in using the given credentials.
   *
   * @param credentials - The username and password to use for authentication.
   * @returns A promise that resolves to the authentication response,
   * or rejects with an error.
   */
  onSubmit() {
    if(this.credentials.username.length>0 && this.credentials.password.length>0){
      this.authService.login(this.credentials).subscribe(
        (response) => {
          localStorage.setItem('loggedInKey', response.token);
          window.location.pathname=""
        },
        (error) => {
          if( error.error.message.includes('Too many failed login attempts')){
            Swal.fire({
              title: 'Timeout',
              text: 'Excidido el limite de intentos, intantalo en '+error.error.message.substring(52,54)+' minutos',
              icon: 'error',
              confirmButtonText: '¡De acuerdo!'
            })
          }
          else{
            Swal.fire({
              title: 'Error',
              text: 'Parece que las credenciales no son correctas',
              icon: 'error',
              confirmButtonText: '¡De acuerdo!'
            })
          }
        }
      );
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar un usuario y una contraseña',
        icon: 'error',
        confirmButtonText: '¡De acuerdo!'
      })
    }
  }
}