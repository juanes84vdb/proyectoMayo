import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css'],
})
export class CabezeraComponent {
  inicio:boolean=false;
  constructor(private usuariosService:UsuariosService){
    if(localStorage.getItem('loggedInKey')){
      this.inicio=true;
    }
  }
  cerrarSesion(){
    localStorage.removeItem('loggedInKey');
    window.location.pathname="";
  }
}
