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
      if (!/[a-z]/.test(this.credentials.password) ||
            !/[A-Z]/.test(this.credentials.password) ||
            !/\d/.test(this.credentials.password) ||
            this.credentials.password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener una Mayuscula, minuscula, numero y tener al menos seis caracteres',
                icon: 'error',
                confirmButtonText: '¡De acuerdo!'
            })
          }
          else{
            this.authService.register(this.credentials).subscribe(
              (response) => {
                this.login()
              },
            (error) => {
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
    else{
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar un usuario y una contraseña',
        icon: 'error',
        confirmButtonText: '¡De acuerdo!'
      })
    }
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('loggedInKey', response.token);
        Swal.fire({
          title: 'Registro',
          text: 'Registro Exitoso',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => { 
          window.location.pathname = ""
        })
      },
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => { 
          window.location.pathname = ""
        })
      }
    );
  }
}
