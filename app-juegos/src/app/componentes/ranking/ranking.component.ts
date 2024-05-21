import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {
  usuario: any[] = [];
  usuarios: any[] = [];
  constructor(private usuariosService: UsuariosService) {
    this.recuperarusuarios();
  }

  /**
 * Retrieves the list of users from the server, filters out banned users, sorts them by the difference between wins and losses,
 * and limits the result to the top 3 users. It also assigns positions to the top 3 users.
 *
 * @returns {void}
 */
  recuperarusuarios() {
    this.usuariosService.ranking().subscribe(
      (response) => {
        this.usuario = response;

        // Filter out banned users
        for (let i = 0; i < this.usuario.length; i++) {
          if (this.usuario[i].ban != true) {
            this.usuarios.push(this.usuario[i]);
          }
        }

        // Sort users by the difference between wins and losses
        this.usuarios.sort((a, b) => (b.ganadas - b.perdidas) - (a.ganadas - a.perdidas));

        // Limit the result to the top 3 users
        this.usuarios.splice(3, this.usuarios.length - 3);

        // Assign positions to the top 3 users
        this.usuarios[0].posicion = 1;
        this.usuarios[1].posicion = 2;
        this.usuarios[2].posicion = 3;
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido obtener el ranking Intentelo mas tarde',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        });
      });
  }
}
