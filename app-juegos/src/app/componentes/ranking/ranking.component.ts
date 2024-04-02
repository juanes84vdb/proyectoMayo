import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  usuarios: any[] = []; 
 
  load=false;
  constructor(private usuariosService:UsuariosService) {
    this.recuperarusuarios();
    setTimeout(() => {
      this.load = true;
  }, 7500); 
  }

  recuperarusuarios() {
    this.usuariosService.ranking().subscribe(response => {
      if (Array.isArray(response)) {
        this.usuarios=response;
      } else {
      //  console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

}
