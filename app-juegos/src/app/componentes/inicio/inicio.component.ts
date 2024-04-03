import { Component, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InicioComponent {
    juegos: any[] = []; 

    constructor( 
      private juegosService:JuegosService) {
        this.recuperarJuegos();
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
}