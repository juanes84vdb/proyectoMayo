import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {
  usuarios: any[] = [];
  constructor(private usuariosService: UsuariosService) {
    this.recuperarusuarios();
  }

  recuperarusuarios() {
    this.usuariosService.ranking().subscribe(
      (response) => {
        this.usuarios = response;
        this.usuarios.sort((a, b) => (b.ganadas - b.perdidas) - (a.ganadas - a.perdidas));
        this.usuarios.splice(3, this.usuarios.length - 3);
        this.usuarios[0].posicion = 1;
        this.usuarios[1].posicion = 2;
        this.usuarios[2].posicion = 3;
      },
      (error) => {
        Swal.fire({
          title: 'Ok',
          text: 'No se ha podido obtener el ranking Intentelo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        });
      });
  }
}
