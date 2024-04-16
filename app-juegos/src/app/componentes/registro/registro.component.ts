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
  ver:boolean=false;
  constructor(private authService: AuthService) { }
  onSubmit() {
    if(this.credentials.username.length>0 && this.credentials.password.length>0){
      if(this.credentials.password.length>5){
        this.authService.register(this.credentials).subscribe(
          (response) => {
            this.login()
          },
          (error) => {
            alert('El usuario ya existe');
          }
        );
      }
      else{
        alert('La contraseña debe tener al menos 6 caracteres');
      }
    }
    else{
      alert('Debes rellenar los dos campos');
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
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        window.location.pathname = ""
      }
    );
  }
}
