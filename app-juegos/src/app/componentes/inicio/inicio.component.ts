import { Component, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
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
        alert("No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado")
      }
      );
    }

    recuperarUsuarios() {
      this.usuariosService.retornar().subscribe(
        (response) => {
          this.usuarios=response;
      },
      (error)=>{
        alert("No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado")
        window.location.pathname = ""
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