import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

class Player {
  estado: (0 | 1)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const ganadoestados = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
];

@Component({
  selector: 'app-tres-raya',
  templateUrl: './tres-raya.component.html',
  styleUrls: ['./tres-raya.component.scss']
})
export class TresRayaComponent {

  player1 = new Player('');
  player2 = new Player('');
  moveCounter = 0;
  jugador = this.player1;
  tablero: (null | 'x' | 'o')[] = [];
  id: any;
  yo: any;
  turno: boolean = true;
  ganador: boolean = false;
  fichas: number = 0;
  tablas: any=false;
  rival: any;
  moversiempre: any = false;
  mover: boolean = false;
  valores: any[] = [];
  load=false
  constructor(private partidasServices: PartidasService,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private authService: AuthService) {
    this.recuperarYo()
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('partida')!;
    });
    const data = {
      id: this.id
    };
  }

  /**
* Recupera el usuario
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
          id: this.id,
          jugador: this.yo
        };
        this.recuperarJuegos(data);
      },
      (error) => {
        Swal.fire({
          title: 'Sesion',
          text: 'La sesion ha caducado vueve a iniciar sesion',
          icon: 'warning',
          confirmButtonText: '¡De acuerdo!'
        })
        localStorage.removeItem('loggedInKey');
        window.location.pathname = "/login"
      });
  }

  recuperarJuegos(id: any) {
    this.partidasServices.retornarTablero(id).subscribe(
      (response) => {
        if (response[0] == "error al cargar la partida") {
          Swal.fire({
            title: 'Sin permiso',
            text: 'No tienes permiso para jugar esta partida',
            icon: 'error',
            confirmButtonText: '¡De acuerdo!'
          }).then((result) => {
            window.location.pathname = ""
          })
        }
        if (response[0].filas.length > 0) {
          this.tablero = response[0].filas;
        }
        else {
          this.tablero = [null, null, null, null, null, null, null, null, null];
        }
        this.turno = response[0].turno
        if(this.turno){
          this.jugador=this.player1
        }
        else{
          this.jugador=this.player2
        }
        this.ganador = response[0].acabado
        this.id = response[0].id
        this.fichas = response[0].fichas
        this.rival = response[0].rival
        this.mover = response[0].mover
        this.load=true
        this.valores = response
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
  move(index: number, player: Player) {
    if (this.tablero[index] === null && (this.mover || this.moversiempre)) {
      player.estado[index] = 1;
      this.moveCounter++;
      this.turno=!this.turno;
      this.mover=false
      this.fichas--
      if(this.fichas==0){
        Swal.fire({
          title: 'Tablas',
          text: 'La partida a terminado en tablas',
          icon: 'info',
          confirmButtonText: '¡De acuerdo!'
        })
        this.tablas=true;
        this.ganador=true;
      }
      this.tablero[index] = this.turno ? 'o' : 'x';
      this.valores[0].filas = this.tablero;
      this.valores[0].turno = this.turno;
      this.valores[0].fichas = this.fichas;
      this.valores[0].acabado = this.ganador;
      this.valores[0].tablas = this.tablas;
      this.partidasServices.updatePartida(this.valores).subscribe();
      if (this.moveCounter >= 5) {
        this.checkganado(this.jugador);
      }
      this.jugador = this.jugador === this.player1 ? this.player2 : this.player1;
    }
  }

  checkganado(player: Player) {
    for (const estado of ganadoestados) {
      let ganado = true;
      this.tablas=false
      for (let i = 0; i < estado.length; i++) {
        if (estado[i] !== 0 && estado[i] !== player.estado[i]) {
          ganado = false;
        }
      }
      if (ganado) {
        if(player==this.player1){
          Swal.fire({
            title: 'Ganador',
            text: 'Han ganado las x',
            icon: 'info',
            confirmButtonText: '¡De acuerdo!'
          })
        }
        else{
          Swal.fire({
            title: 'Ganador',
            text: 'Han ganado las o',
            icon: 'info',
            confirmButtonText: '¡De acuerdo!'
          })
        }
        this.valores[0].filas = this.tablero;
        this.valores[0].turno = this.turno;
        this.valores[0].fichas = this.fichas;
        this.valores[0].acabado = true;
        this.valores[0].tablas = this.tablas;
        this.partidasServices.updatePartida(this.valores).subscribe();
      }
    }
  }
  async checkRival() {
    const { value: password } = await Swal.fire({
      title: "Contraseña",
      input: "password",
      inputLabel: "Introduce la contraseña de "+this.rival+" para continuar",
      inputPlaceholder: "Escribe la contraseña",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
    if (password) {
      const credentials = { username: this.rival, password: password };
      this.authService.login(credentials).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
          })
          this.moversiempre=true;
        },
        (error) => {
            // Show a generic error message
            Swal.fire({
              title: 'Error',
              text: 'Parece que la contraseña no es correcta',
              icon: 'error',
              confirmButtonText: '!De acuerdo!'
            })
        }
      )
    }
  }
}
