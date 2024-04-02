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
    if(this.credentials.username.length>0 && this.credentials.password.length>0){
      if(this.credentials.password.length>5){
        this.authService.register(this.credentials).subscribe(
          (response) => {
            this.login()
          },
          (error) => {
            alert('Error ha ocurrido un problema intentelo de nuevo mas tarde');
            window.location.pathname = ""
          }
        );
      }
      else{
        alert('La contraseña debe tener al menos 6 caracteres');
      }
    }
    else{
      alert('Dees rellenar los dos campos');
    }
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('loggedInKey', response.token);
        alert('Registro Exitoso');
        window.location.pathname = ""
      },
      (error) => {
        alert('Error ha ocurrido un problema intentelo de nuevo mas tarde');
        window.location.pathname = ""
      }
    );
  }
}
