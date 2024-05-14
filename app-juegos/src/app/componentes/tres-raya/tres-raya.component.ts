import { Component } from '@angular/core';

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

  player1 = new Player('Mario');
  player2 = new Player('mario2');
  moveCounter = 0;
  jugador = this.player1;
  board: (null | 'x' | 'o')[] = [null, null, null, null, null, null, null, null, null];

  move(index: number, player: Player) {
    if (this.board[index] === null) {
      player.estado[index] = 1;
      this.moveCounter++;
      this.board[index] = this.jugador === this.player1 ? 'x' : 'o';
      if (this.moveCounter >= 5) {
        this.checkganado(this.jugador);
      }    
      this.jugador = this.switchjugador();
    } else {
      alert("Can't move");
    }
  }

  switchjugador() {
    return this.jugador === this.player1 ? this.player2 : this.player1;
  }

  checkganado(player: Player) {
    for (const estado of ganadoestados) {
      let ganado = true;
      for (let i = 0; i < estado.length; i++) {
        if (estado[i] !== 0 && estado[i] !== player.estado[i]) {
          ganado = false;
          break;
        }
      }
      if (ganado) {
        this.endGame(player);
        break;
      }
    }
  }

  endGame(player: Player) {
    alert(player.name + ' ganados!');
    this.player1.estado = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.player2.estado = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;
  }
}
