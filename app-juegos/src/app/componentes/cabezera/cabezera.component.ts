import { Component } from '@angular/core';


@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css'],
})
export class CabezeraComponent {
  inicio:boolean=false;
  constructor(){
    if(localStorage.getItem('loggedInKey')){
      this.inicio=true;
    }
  }
  cerrarSesion(){
    localStorage.removeItem('loggedInKey');
    window.location.reload()
  }
}
