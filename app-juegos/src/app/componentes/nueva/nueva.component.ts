import { Component } from '@angular/core';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent {
  juegos: any[] = []; 
  usuarios: any[]=[];
  yo:string="";
  load=false;
  constructor(private juegosService:JuegosService,
    private usuariosService:UsuariosService
    ){
      this.recuperarJuegos();
      this.recuperarUsuarios();
      this.recuperarYo();
      setTimeout(() => {
        this.load = true;
    }, 4000); 
  }
  recuperarJuegos() {
    this.juegosService.retornar().subscribe(response => {
      if (Array.isArray(response)) {
        this.juegos=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }
  recuperarUsuarios() {
    this.usuariosService.retornar().subscribe(response => {
      if (Array.isArray(response)) {
        this.usuarios=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    }); 
  }
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(response => {
      if (Array.isArray(response)) {
        this.yo=response[0].usuario;
      //  console.log(this.yo)
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }
}
