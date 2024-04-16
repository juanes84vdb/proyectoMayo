import { Component, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InicioComponent {
    juegos: any[] = []; 
    usuarios: any[]=[];
    usuario:any
    buscador: any=""
    constructor( 
      private juegosService:JuegosService,
      private usuariosService:UsuariosService,) {
        this.usuario="Elige usuario"
        this.recuperarJuegos();
        this.recuperarUsuarios()
      }

    recuperarJuegos() {
      this.juegosService.retornar().subscribe(
        (response) => {
        
          this.juegos=response;
      },
      (error)=>{
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
      }
      );
    }

    recuperarUsuarios() {
      this.usuariosService.retornar().subscribe(
        (response) => {
          this.usuarios=response;
      },
      (error)=>{
        Swal.fire({
          title: 'Sesion',
          text: 'La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
      }
      ); 
    }

    buscado(valido:any){
      if(valido.toLowerCase().includes(this.buscador.toLowerCase()) || this.buscador==null || this.buscador==""){
        return true
      }
      else{
        return false
      }
    }
    onSubmit(){
      if(this.usuario!=="Elige usuario")
      window.location.pathname="/usuario/"+this.usuario
    }
}