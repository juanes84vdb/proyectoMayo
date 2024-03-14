import { Component } from '@angular/core';
import { JuegosService } from '../../servicios/juegos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
    juegos: any[] = []; 

    constructor( 
      private juegosService:JuegosService) {
        this.recuperarJuegos();
      }

    recuperarJuegos() {
      this.juegosService.retornar().subscribe(response => {
        if (Array.isArray(response)) {
          this.juegos=response;
        } else {
          console.error('Los datos recibidos no son un array:', response);
        }
      });
    }
}