import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) { }
  onSubmit() {
    this.authService.register(this.credentials).subscribe(
      (response) => {
      //  console.log(this.credentials)
      //  console.log('Succes', response);
        this.login()
      },
      (error) => {
      //  console.log(error)
        alert('Error ' + error.error.message);
      }
    );
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
      //  console.log('Succes', response);
        localStorage.setItem('loggedInKey', response.token);
        window.location.pathname = ""
      },
      (error) => {
      //  console.log(error)
        alert('Error ' + error.error.message);
      }
    );
  }
}
