import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent {
  partidas: any[] = [];
  juego: any = null
  yo: number = 0;
  recientes: any
  ganadas = false;
  perdidas = false;
  empatadas = false;
  jugando = true;
  oponente = "";
  constructor(private partidasServices: PartidasService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.juego = params.get('juego');
    });
    //  const interval = Rx.Observable.interval(100).mapTo(this.recuperarYo()).take(3);
    this.recuperarYo();
  }

  /**
 * This function retrieves the user's games from the server.
 *
 * @param data - An object containing the user's ID.
 * @param data.id - The ID of the user.
 * @param data.usuario - The ID of the user.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server connection fails or the session has expired.
 *
 * @remarks
 * This function uses the `PartidasUsuario` method from the `PartidasService` to fetch the user's games.
 * It subscribes to the observable returned by the method and updates the `partidas` array with the response.
 * If an error occurs during the server request, it displays a SweetAlert2 warning message and logs out the user.
 */
  recuperarPartidas(data: any) {
    this.partidasServices.PartidasUsuario(data).subscribe(
      (response) => {
        this.partidas = response;
      },
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
        window.location.pathname = ""
      });
  }

  /**
 * This function retrieves the user's ID from the server.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the server connection fails or the session has expired.
 *
 * @remarks
 * This function uses the `retornarYo` method from the `UsuariosService` to fetch the user's ID.
 * It subscribes to the observable returned by the method and updates the `yo` property with the response.
 * If an error occurs during the server request, it displays a SweetAlert2 warning message and logs out the user.
 */
  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
        if (response[0].ban == true) {
          localStorage.removeItem('loggedInKey');
          Swal.fire({
            title: 'Ban',
            text: 'Has sido banedo Hay que portarse bien',
            icon: 'info',
            confirmButtonText: '!De acuerdo!'
          }).then(() => {
            window.location.pathname = ""
          });
        }

        this.yo = response[0].id;
        const data = {
          id: null,
          usuario: this.yo
        };
        // Call the function to retrieve the user's games after retrieving the user's ID
        this.recuperarPartidas(data);
      },
      (error) => {
        Swal.fire({
          title: 'No ha sido posible establecer la conexion',
          text: 'No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
        window.location.pathname = ""
      }
    );
  }
  /**
 * This function is used to sort the games based on their date.
 *
 * @param reciente - A boolean indicating whether to sort the games in descending order (most recent first) or not.
 *
 * @returns {void}
 *
 * @remarks
 * This function sorts the `partidas` array in ascending order (oldest first) when `reciente` is false.
 * It sorts the `partidas` array in descending order (most recent first) when `reciente` is true.
 * The sorting is based on the `partida` property of each game object.
 *
 * @example
 * // Assuming `this.recientes` is true and `this.partidas` contains the following game objects:
 * // [
 * //   { partida: 10,... },
 * //   { partida: 5,... },
 * //   { partida: 15,... }
 * // ]
 * // After calling `setRecientes(true)`, `this.partidas` will be sorted as follows:
 * // [
 * //   { partida: 15,... },
 * //   { partida: 10,... },
 * //   { partida: 5,... }
 * // ]
 *
 * // Assuming `this.recientes` is false and `this.partidas` contains the following game objects:
 * // [
 * //   { partida: 10,... },
 * //   { partida: 5,... },
 * //   { partida: 15,... }
 * // ]
 * // After calling `setRecientes(false)`, `this.partidas` will be sorted as follows:
 * // [
 * //   { partida: 5,... },
 * //   { partida: 10,... },
 * //   { partida: 15,... }
 * // ]
 */
  setRecientes(reciente: boolean) {
    this.recientes = reciente;
    if (this.recientes) {
      this.partidas = this.partidas.sort((b, a) => a.partida - b.partida);
    }
    else {
      this.partidas = this.partidas.sort((a, b) => a.partida - b.partida);
    }
  }

  /**
 * This function filters the games based on the selected options.
 *
 * @param partida - The game object to be filtered.
 * @param partida.ganado - Indicates if the game has been won (true), lost (false), or drawn (null).
 * @param partida.acabado - Indicates if the game has ended.
 *
 * @returns {boolean} - Returns true if the game should be displayed based on the filter criteria, false otherwise.
 *
 * @remarks
 * This function checks the values of `this.ganadas`, `this.perdidas`, `this.empatadas`, and `this.jugando` to determine
 * if the game should be displayed. If any of the filter options are true, the function checks the corresponding
 * condition for the game. If all filter options are false, the function returns true, indicating that all games should be displayed.
 *
 * @example
 * // Assuming `this.ganadas` is true, `this.perdidas` is false, `this.empatadas` is false, `this.jugando` is false,
 * // and `partida.ganado` is true
 * // The function will return true, as the game has been won and the 'ganadas' filter is selected
 *
 * // Assuming `this.ganadas` is false, `this.perdidas` is true, `this.empatadas` is false, `this.jugando` is false,
 * // and `partida.ganado` is false
 * // The function will return true, as the game has been lost and the 'perdidas' filter is selected
 *
 * // Assuming `this.ganadas` is false, `this.perdidas` is false, `this.empatadas` is true, `this.jugando` is false,
 * // and `partida.ganado` is null
 * // The function will return true, as the game has been drawn and the 'empatadas' filter is selected
 *
 * // Assuming `this.ganadas` is false, `this.perdidas` is false, `this.empatadas` is false, `this.jugando` is true,
 * // and `partida.acabado` is false
 * // The function will return true, as the game is still in progress and the 'jugando' filter is selected
 *
 * // Assuming `this.ganadas` is false, `this.perdidas` is false, `this.empatadas` is false, `this.jugando` is false,
 * // and `partida.ganado` is true
 * // The function will return false, as no filter options are selected
 */
  filtro(partida: any) {
    if (this.ganadas && partida.ganado == true) {
      return true
    }
    if (this.perdidas && partida.ganado == false) {
      return true
    }
    if (this.empatadas && partida.ganado == null) {
      return true
    }
    if (this.jugando && !partida.acabado) {
      return true
    }
    if (!this.jugando && !this.ganadas && !this.perdidas && !this.empatadas) {
      return true
    }
    return false
  }

  /**
 * This function filters the games based on the opponent's name.
 *
 * @param partida - The game object to be filtered.
 * @param partida.rival - The name of the opponent in the game.
 *
 * @returns {boolean} - Returns true if the game should be displayed based on the filter criteria, false otherwise.
 *
 * @remarks
 * This function checks if the opponent's name (case-insensitive) includes the value of `this.oponente`.
 * If `this.oponente` is empty or not provided, it returns true, indicating that all games should be displayed.
 *
 * @example
 * // Assuming `this.oponente` is 'John' and `partida.rival` is 'John Doe'
 * // The function will return true, as 'John' is included in 'John Doe'
 *
 * // Assuming `this.oponente` is 'John' and `partida.rival` is 'Jane Doe'
 * // The function will return false, as 'John' is not included in 'Jane Doe'
 *
 * // Assuming `this.oponente` is not provided and `partida.rival` is 'John Doe'
 * // The function will return true, as `this.oponente` is empty
 */
  filtroBusqueda(partida: any) {
    if (partida.rival.toLowerCase().includes(this.oponente.toLowerCase())) {
      return true
    }
    if (!this.oponente || this.oponente == "") {
      return true
    }
    return false
  }
}