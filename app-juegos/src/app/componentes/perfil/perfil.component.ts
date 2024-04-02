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
  constructor(private usuariosService:UsuariosService){
    this.recuperarYo();
    setTimeout(() => {
      this.load = true;
  }, 7500); 
  }

  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        this.perfil=response;
      },
      (error) => {
        this.load = true;
      }
    );
  }
}
