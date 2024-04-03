import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  perfil:any[]=[]
  load=false;
  color:any
  foto:any
  constructor(private usuariosService:UsuariosService){
    this.recuperarYo();
  }

  newcolor() {
    const data={
      color: this.color,
      id: this.perfil[0].id
    }
    this.usuariosService.newcolor(data).subscribe(
      (response) => {
        alert("Color actualizado correctamente")
      },
      (error) => {
        alert("Ha habido un problema en la actualizacion")
      }
    );
  }
  newfotopreview(event:any) {
    const reader = new FileReader();
    const file =event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.foto=reader.result;
    }
  }

  newfoto(){
    if(this.foto==null){
      this.foto=false
    }
    const data={
      foto: this.foto,
      id: this.perfil[0].id
    }
    this.usuariosService.newfoto(data).subscribe(
      (response) => {
        alert("Foto actualizada correctamente")
        window.location.reload();
      },
      (error) => {
        alert("Ha habido un problema en la actualizacion")
      }
    );
  }
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        this.perfil=response;
        this.color=response[0].color;
      },
      (error) => {
        this.load = true;
      }
    );
  }
}
