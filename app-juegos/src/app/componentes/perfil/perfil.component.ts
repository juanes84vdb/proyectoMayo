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
  newfotopreview(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.foto = reader.result;
    }
  }

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
        })
        window.location.reload();
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
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        this.perfil = response;
        this.color = response[0].color;
      },
      (error) => {
        this.load = true;
      }
    );
  }
}
