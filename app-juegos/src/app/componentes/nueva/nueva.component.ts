import { Component } from '@angular/core';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

interface usuario {
  name: string;
  id: number;
}
interface juego {
  name: string;
  id: number;
}
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
  load=false;
  UserInterfece: usuario[] =[];
  selectedUsuario: usuario |undefined;
  JuegoInterfece: juego[] =[];
  selectedJuego: juego |undefined;
  malLogin:boolean=false;
  constructor(private juegosService:JuegosService,
    private usuariosService:UsuariosService,
    private partidasServices: PartidasService
    ){
      this.recuperarYo();
      this.recuperarJuegos();
  }
  recuperarJuegos() {
    this.juegosService.retornar().subscribe(response => {
        this.juegos=response;
        for (let i = 0; i < this.juegos.length; i++){
          this.JuegoInterfece.push({name: this.juegos[i].nombre, id: this.juegos[i].id})
        }
        console.log(this.JuegoInterfece)
    });
  }
  recuperarUsuarios() {
    this.usuariosService.retornar().subscribe(
      (response) => {
        this.usuarios=response;
        for (let i = 0; i < this.usuarios.length; i++){
          if(this.usuarios[i].nombre!==this.yo)
          this.UserInterfece.push({name: this.usuarios[i].nombre, id: this.usuarios[i].id})
        }
        this.load = true;
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
        this.yo=response[0].usuario;
        this.yoId=response[0].id;
        this.recuperarUsuarios();
      },
      (error) => {
        this.malLogin = true;
      }
    );
  };
  onSubmit() {
    if (this.selectedJuego)
    console.log(this.selectedJuego.id)
    if(this.selectedUsuario && this.selectedJuego){
      const data={
        jugador1: this.yoId,
        jugador2: this.selectedUsuario.id,
        tipo: this.selectedJuego.id
      }
      this.nuevaPartida(data);
    }
  }

  nuevaPartida(data:any) {
    this.partidasServices.newPartida(data).subscribe(response => {
        Swal.fire({
          title: 'Ok',
          text: 'Partida Creada Correctamente',
          icon: 'success',
          confirmButtonText: '¡De acuerdo!'
        }).then((result) => { 
          window.location.pathname = ""
        })
    });
  }
}
