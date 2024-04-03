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
        this.usuarios.sort((a, b) => (b.ganadas-b.perdidas) - (a.ganadas-a.perdidas));
        this.usuarios.splice(3,this.usuarios.length-3);
        this.usuarios[0].posicion=1;
        this.usuarios[1].posicion=2;
        this.usuarios[2].posicion=3;
      } else {
      //  console.error('Los datos recibidos no son un array:', response);
      }
    });
  }
}
