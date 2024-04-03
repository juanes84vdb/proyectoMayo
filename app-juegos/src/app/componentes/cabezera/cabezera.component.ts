import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css'],
})
export class CabezeraComponent {
  inicio:boolean=false;
  yo:any=null;
  constructor(private usuariosService:UsuariosService){
    this.recuperarYo();
    if(localStorage.getItem('loggedInKey')){
      this.inicio=true;
    }
  }
  cerrarSesion(){
    localStorage.removeItem('loggedInKey');
    window.location.pathname="";
  }

  recuperarYo() {
    if(localStorage.getItem("loggedInKey")!==null){
    this.usuariosService.retornarYo().subscribe(response => {
        this.yo=response[0].perfil;
    });}
  } 
}
