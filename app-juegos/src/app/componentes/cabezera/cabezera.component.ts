import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css'],
})
export class CabezeraComponent {
  inicio:boolean=false;
  yo:string="";
  constructor(private usuariosService:UsuariosService){
    this.recuperarYo();
    if(localStorage.getItem('loggedInKey')){
      this.inicio=true;
    }
  }
  cerrarSesion(){
    localStorage.removeItem('loggedInKey');
    window.location.pathname="";
   // window.location.reload()
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
