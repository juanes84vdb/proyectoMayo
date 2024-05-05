import { Component, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';
 
interface usuario {
  name: string;
  id: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InicioComponent {
    juegos: any[] = []; 
    usuarios: any[]=[];
    usuario:any;
    buscador: any="";
    UserInterfece: usuario[] =[];
    selectedUsuario: usuario |undefined;
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
          text: 'No se ha podido Conectar al servidor intentelo mas tarde. La sesion puede haber expirado',
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
          for (let i = 0; i < this.usuarios.length; i++){
            this.UserInterfece.push({name: this.usuarios[i].nombre, id: this.usuarios[i].id})
          }
      },
      (error)=>{
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
      if(this.selectedUsuario){
        window.location.pathname="/usuario/"+this.selectedUsuario.id
      }
    }
}