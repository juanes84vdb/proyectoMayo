import { Component } from '@angular/core';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.scss']
})
export class NuevaComponent {
  juegos: any[] = []; 
  usuarios: any[]=[];
  yo:string="";
  yoId:number=0;
  rival:any;
  juego:any;
  load=false;
  malLogin:boolean=false;
  constructor(private juegosService:JuegosService,
    private usuariosService:UsuariosService,
    private partidasServices: PartidasService
    ){
      this.rival="Elija su adversario";
      this.juego="Elija el juego"
      this.recuperarJuegos();
      this.recuperarUsuarios();
      this.recuperarYo();
  }
  recuperarJuegos() {
    this.juegosService.retornar().subscribe(response => {
        this.juegos=response;
    });
  }
  recuperarUsuarios() {
    this.usuariosService.retornar().subscribe(
      (response) => {
        this.usuarios=response;
    },
    (error)=>{
      Swal.fire({
        title: 'No ha sido posible establecer la conexion',
        text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
        icon: 'warning',
        confirmButtonText: '¡De acuerdo!'
      })
      localStorage.removeItem('loggedInKey');
      window.location.pathname = ""
    }
    ); 
  }
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        this.load = true;
        this.yo=response[0].usuario;
        this.yoId=response[0].id;
      },
      (error) => {
        this.malLogin = true;
      }
    );
  };
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
