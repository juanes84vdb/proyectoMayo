import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  /**
   * Logs the user in using the given credentials.
   *
   * @param credentials - The username and password to use for authentication.
   * @returns A promise that resolves to the authentication response,
   * or rejects with an error.
   */
  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Succes', response);
        localStorage.setItem('loggedInKey', response.token);
      },
      (error) => {
        console.log(this.credentials);
        console.log('Error', error);
      }
    );
  }
}
