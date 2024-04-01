import { Component } from '@angular/core';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
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
  yoId:number=0;
  rival:any;
  juego:any;
  load=false;
  constructor(private juegosService:JuegosService,
    private usuariosService:UsuariosService,
    private partidasServices: PartidasService
    ){
      this.rival="Elija su adversario";
      this.juego="Elija el juego"
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
        this.yoId=response[0].id;
      //  console.log(this.yo)
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }
  onSubmit() {
    if(this.rival=="Elija su adversario" ||
    this.juego=="Elija el juego"){}
    else{
      const data={
        jugador1: this.yoId,
        jugador2: this.rival,
        tipo: this.juego
      }
      this.nuevaPartida(data);
    }
  }

  nuevaPartida(data:any) {
    this.partidasServices.newPartida(data).subscribe(response => {
        alert("Partida Creada Correctamente")
        window.location.pathname="";
    });
  }
}
