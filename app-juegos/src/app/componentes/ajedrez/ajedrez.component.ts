import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-ajedrez',
  templateUrl: './ajedrez.component.html',
  styleUrls: ['./ajedrez.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AjedrezComponent {
  @ViewChild('tablero') tablerohtml!: ElementRef;
  id: any | null = null;
  tablero: any[][] = [];
  segundosTranscurridos = 0;
  blancas: any[] = ["♖", "♘", "♗", "♕", "♔", "♙"];
  negras: any[] = ["♜", "♞", "♝", "♛", "♚", "♟"];
  turno: boolean = true;
  color: any | null = null;
  coronado: boolean = false;
  ganador: boolean = true;
  load: boolean = false;
  tablas: boolean = false;
  fichas: any;
  colort: string = "";
  valores: any;
  yo: any;
  move: boolean = false;
  moversiempre: any = false;
  rival: any;
  constructor(private renderer: Renderer2,
    private partidasServices: PartidasService,
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
 * This function is responsible for retrieving the user's ID from the server.
 * It subscribes to the observable returned by the `retornarYo` method of the `usuariosService`.
 * If the user is banned, it removes the 'loggedInKey' from local storage and displays a Swal alert.
 * It then retrieves the user's ID and calls the `recuperarJuegos` method with the user's ID and the game ID.
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
      }
    );
  }

  /**
 * Angular lifecycle hook that is called after a component's view has been fully initialized.
 * It is called after the constructor, ngOnInit, and ngOnChanges methods.
 * In this case, it is used to set up a timer that periodically checks if the tablero has been loaded.
 * If the tablero is loaded within 10 seconds, the timer is cleared and the tablero is drawn.
 * If the tablero is not loaded within 10 seconds, the timer is cleared.
 */
  ngAfterViewInit(): void {
    const intervalo = setInterval(() => {
      this.segundosTranscurridos++;
      if (this.tablero.length > 0) {
        // If the tablero is loaded, draw the tablero and clear the timer
        this.dibujarTabla(this.tablero);
        clearInterval(intervalo);
      }
      if (this.segundosTranscurridos >= 10) {
        // If the tablero is not loaded within 10 seconds, clear the timer
        clearInterval(intervalo);
      }
    }, 1000); // Timer interval is set to 1 second
  }

  /**
 * This function retrieves the game data from the server based on the provided id.
 * It subscribes to the `retornarTablero` method of the `PartidasService` and handles the response.
 * If the server returns an error message, it shows a Swal alert and redirects the user to the home page.
 * If the server returns a game with existing board data, it sets the `tablero` property with the received data.
 * If the server returns a new game without board data, it initializes the `tablero` property with the default chess board layout.
 * It also sets the `turno`, `ganador`, `id`, `fichas`, and `valores` properties based on the server response.
 * If there is an error during the request, it shows a Swal alert and logs out the user.
 * @param id - The id of the game to retrieve.
 */
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
          this.tablero = [
            ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
            ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
            ["♖", "♘", "♗", "♔", "♕", "♗", "♘", "♖"]
          ]
        }
        this.turno = response[0].turno
        this.ganador = response[0].acabado
        this.move = response[0].mover
        this.id = response[0].id
        this.fichas = response[0].fichas
        this.rival = response[0].rival
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

  /**
   * This function is responsible for handling the game logic when a player requests to check the rival's credentials.
   * It prompts the player to enter the rival's password and sends the credentials to the server for verification.
   * If the credentials are correct, it allows the player to request a checkmate.
   */
  async checkRival() {
    const { value: password } = await Swal.fire({
      title: "Contraseña",
      input: "password",
      inputLabel: "Introduce la contraseña de " + this.rival + " para continuar",
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
          this.moversiempre = true;
        },
        (error) => {
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
  /**
 * This function is responsible for drawing the chessboard on the screen.
 * It takes a 2D array representing the current state of the chessboard and generates the HTML structure to display it.
 * It also adds event listeners to the cells of the chessboard to handle drag and drop functionality.
 * @param tablero - A 2D array representing the current state of the chessboard.
 */
  dibujarTabla(tablero: any[][]) {
    this.load = true
    // Set the color of the current player
    if (this.turno === true) {
      this.colort = "Blancas"
    }
    else {
      this.colort = "Negras"
    }
    // Initialize variables
    this.color = null;
    this.coronado = false;
    // Create a new row for the column headers
    const seccion = this.renderer.createElement("tr");
    seccion.innerHTML = '<th></th>';
    // Add column headers to the row
    for (let i = 0; i < 8; i++) {
      seccion.innerHTML += "<th>" + i + "</th>";
    }
    // Append the row to the chessboard
    this.renderer.appendChild(this.tablerohtml.nativeElement, seccion);
    // Iterate through each row of the chessboard
    for (let fila = 0; fila < 8; fila++) {
      const seccion = this.renderer.createElement("tr");
      seccion.innerHTML = "<th>" + fila + "</th>";
      // Iterate through each cell in the row
      for (let columna = 0; columna < 8; columna++) {
        const celda = this.renderer.createElement("td");
        celda.innerHTML = tablero[fila][columna];
        celda.className = "f" + fila;
        celda.classList.add("c" + columna);
        celda.draggable = true;
        // Add event listeners to handle drag and drop functionality
        celda.addEventListener('dragover', (e: any) => {
          e.preventDefault();
        });
        celda.addEventListener('dragstart', (e: any) => {
          if (!this.ganador && (this.move || this.moversiempre)) {
            // Determine the color of the piece being dragged
            for (let i = 0; i < this.negras.length; i++) {
              if (celda.innerHTML == this.negras[i]) {
                this.color = "negras";
              }
              else if (celda.innerHTML == this.blancas[i]) {
                this.color = "blancas";
              }
            }
            // Call the appropriate movement function for the piece being dragged
            if (celda.innerHTML == "♙" || celda.innerHTML == "♟") {
              this.moverPeon(fila, columna, this.color);
            }
            else if (celda.innerHTML == "♔" || celda.innerHTML == "♚") {
              this.moverRey(fila, columna);
            }
            else if (celda.innerHTML == "♕" || celda.innerHTML == "♛") {
              this.moverReina(fila, columna, this.color);
            }
            else if (celda.innerHTML == "♖" || celda.innerHTML == "♜") {
              this.moverTorre(fila, columna, this.color);
            }
            else if (celda.innerHTML == "♗" || celda.innerHTML == "♝") {
              this.moverAlfil(fila, columna, this.color);
            }
            else if (celda.innerHTML == "♘" || celda.innerHTML == "♞") {
              this.moverCaballo(fila, columna, this.color);
            }
            else {
              e.preventDefault();
            }
          }
        });
        // Add event listener to handle the end of the drag event
        celda.addEventListener("dragend", () => {
          const valida = document.getElementsByClassName("valida");
          const cambiar = document.getElementsByClassName("cambiar")[0] as HTMLElement;
          const enrocar = document.getElementsByClassName("enroque");
          // Handle the movement of the piece
          if (cambiar) {
            cambiar.classList.remove("cambiar");
            if (cambiar.classList.contains("valida")) {
              if (this.color == "blancas" && this.turno && !this.coronado) {
                for (let i = 0; i < this.blancas.length; i++) {
                  if (cambiar.innerHTML == "♚") {
                    i = this.blancas.length
                    this.victoria();
                  }
                }
                this.mover(cambiar, celda);
              }
              else if (this.color == "negras" && !this.turno && !this.coronado) {
                for (let i = 0; i < this.negras.length; i++) {
                  if (cambiar.innerHTML == "♔") {
                    i = this.negras.length
                    this.victoria();
                  }
                }
                this.mover(cambiar, celda);
              }
            }
            if (cambiar.classList.contains("enroque")) {
              if (this.color == "blancas" && this.turno && !this.coronado) {
                this.enroque(cambiar, celda);
              }
              else if (this.color == "negras" && !this.turno && !this.coronado) {
                this.enroque(cambiar, celda);
              }
            }
            if (!this.ganador) {
              this.coronar(cambiar)
            }
          }
          // Remove the enroque class from cells
          for (let i = 0; i < enrocar.length; i++) {
            enrocar[0].classList.remove("enroque");
          }
          // Remove the valida class from cells
          for (let i = 0; i < 64; i++) {
            if (valida[0]) {
              valida[0].classList.remove("valida");
            }
          }
        });
        // Add event listeners to handle the dragenter and dragleave events
        celda.addEventListener("dragenter", function (e: any) {
          e.preventDefault();
          if (celda.classList.contains("valida") || celda.classList.contains("enroque")) {
            celda.classList.add("cambiar");
          }
        });
        // Add event listeners to handle the dragenter and dragleave events
        celda.addEventListener("dragleave", function (e: any) {
          e.preventDefault();
          celda.classList.remove("cambiar");
        });
        seccion.appendChild(celda);
      }
      this.renderer.appendChild(this.tablerohtml.nativeElement, seccion);
    }
  }
  /**
 * This function is responsible for moving a piece from one cell to another on the chessboard.
 * It updates the chessboard state, changes the turn, and updates the game data on the server.
 * @param cambiar - The HTML element representing the cell where the piece is being moved from.
 * @param celda - The HTML element representing the cell where the piece is being moved to.
 */
  mover(cambiar: HTMLElement, celda: HTMLElement) {
    // Check if there is a piece in the cell being moved from
    if (cambiar.innerHTML !== "") {
      // If there is a piece, call the comido function to handle the capture
      this.comido(cambiar);
    }
    // Move the piece from the source cell to the destination cell
    cambiar.innerHTML = celda.innerHTML;
    celda.innerHTML = "";
    // Change the turn
    this.turno = !this.turno;
    // Update the color of the current player
    if (this.turno === true) {
      this.colort = "Blancas"
    }
    else {
      this.colort = "Negras"
    }
    // Get all the cells of the chessboard
    const casiilas = document.getElementsByTagName("td")
    // Update the tablero array with the current state of the chessboard
    for (let j = 0; j <= 7; j++) {
      let x = 0
      for (let i = j * 8; i < j * 8 + 8; i++, x++) {
        this.tablero[j][x] = casiilas[i].innerHTML
      }
    }
    // Update the game data
    this.move = false
    this.valores[0].filas = this.tablero;
    this.valores[0].turno = this.turno;
    this.valores[0].fichas = this.fichas;
    this.valores[0].acabado = this.ganador;
    this.valores[0].tablas = this.tablas;
    // Send the updated game data to the server
    this.partidasServices.updatePartida(this.valores).subscribe();
  }

  /**
   * This function is responsible for handling the capture of a piece on the chessboard.
   * It updates the number of remaining pieces, adds the captured piece to the appropriate side's graveyard,
   * and checks if the game has ended in a stalemate or checkmate.
   * @param cambiar - The HTML element representing the cell where the captured piece is located.
   */
  comido(cambiar: HTMLElement) {
    // Decrement the number of remaining pieces
    this.fichas = this.fichas - 1;
    // Determine the side that captured the piece
    if (!this.turno) {
      // If it's black's turn, add the captured piece to white's graveyard
      const cementerio = document.getElementsByTagName("article")[0];
      if (cambiar.innerHTML === "♙") {
        cementerio.innerHTML = cambiar.innerHTML + " " + cementerio.innerHTML;
      } else {
        cementerio.innerHTML = cementerio.innerHTML + " " + cambiar.innerHTML;
      }
    } else {
      // If it's white's turn, add the captured piece to black's graveyard
      const cementerio = document.getElementsByTagName("article")[1];
      if (cambiar.innerHTML === "♟") {
        cementerio.innerHTML = cambiar.innerHTML + " " + cementerio.innerHTML;
      } else {
        cementerio.innerHTML = cementerio.innerHTML + " " + cambiar.innerHTML;
      }
    }
    // Check if the game has ended in a stalemate or checkmate
    if (this.fichas === 0) {
      this.empate();
    }
  }
  /**
   * This function is responsible for handling the castling move in the game.
   * It updates the position of the king and the rook on the chessboard.
   * @param cambiar - The HTML element representing the cell where the king is being moved from.
   * @param celda - The HTML element representing the cell where the king is being moved to.
   */
  enroque(cambiar: HTMLElement, celda: HTMLElement) {
    if (this.turno) { // Check if it's white's turn
      if (celda.classList.contains("c0")) { // Check if the king is moving to the left rook position
        const posirey = document.getElementsByClassName("f7 c1")[0];
        const positorre = document.getElementsByClassName("f7 c2")[0];
        posirey.innerHTML = "♔"; // Update the king's position
        positorre.innerHTML = "♖"; // Update the rook's position
      } else { // The king is moving to the right rook position
        const posirey = document.getElementsByClassName("f7 c6")[0];
        const positorre = document.getElementsByClassName("f7 c5")[0];
        posirey.innerHTML = "♔"; // Update the king's position
        positorre.innerHTML = "♖"; // Update the rook's position
      }
    } else { // It's black's turn
      if (celda.classList.contains("c0")) { // Check if the king is moving to the left rook position
        const posirey = document.getElementsByClassName("f0 c1")[0];
        const positorre = document.getElementsByClassName("f0 c2")[0];
        posirey.innerHTML = "♚"; // Update the king's position
        positorre.innerHTML = "♜"; // Update the rook's position
      } else { // The king is moving to the right rook position
        const posirey = document.getElementsByClassName("f0 c6")[0];
        const positorre = document.getElementsByClassName("f0 c5")[0];
        posirey.innerHTML = "♚"; // Update the king's position
        positorre.innerHTML = "♜"; // Update the rook's position
      }
    }
    cambiar.innerHTML = ""; // Remove the king from the original position
    celda.innerHTML = ""; // Remove the empty cell
    this.turno = !this.turno; // Change the turn
  }

  /**
   * This function is responsible for handling the piece coronation in the game.
   * It updates the HTML of the selected piece with the chosen coronation piece.
   * @param elegido - The HTML element representing the chosen piece for coronation.
   */
  elegirfigura(elegido: HTMLElement) {
    // Get the HTML element of the piece that needs to be coronated
    const cambiar = document.getElementsByClassName("coronado")[0] as HTMLElement;

    // Update the HTML of the chosen piece for coronation
    cambiar.innerHTML = elegido.innerHTML;

    // Set the coronated flag to false
    this.coronado = false;

    // Remove the 'coronado' class from the piece
    cambiar.classList.remove("coronado");

    // Get the HTML element of the coronation selection table
    const borrar = document.getElementsByClassName("eleccion")[0] as HTMLElement;

    // Remove the coronation selection table from the HTML
    borrar.remove();
  }
  /**
   * This function is responsible for handling the piece coronation in the game.
   * It updates the HTML of the selected piece with the chosen coronation piece.
   * @param cambiar - The HTML element representing the chosen piece for coronation.
   */
  coronar(cambiar: HTMLElement) {
    // Check if the piece is a pawn and if it's in the correct row for coronation
    if (cambiar.classList.contains("f0") && cambiar.innerHTML === "♙") {
      let cuerpo: any = ""
      cuerpo = document.querySelector("div");
      cambiar.classList.add("coronado");
      this.coronado = true;
      const seccion = this.renderer.createElement("table");
      // Create a table for the player to choose the coronation piece
      for (let i = 0; i < this.blancas.length - 2; i++) {
        const eleccion = this.renderer.createElement("td");
        eleccion.innerHTML = this.blancas[i];
        // Add an event listener to handle the player's choice
        eleccion.addEventListener("click", () => {
          this.elegirfigura(eleccion);
        });
        seccion.append(eleccion);
      }
      seccion.className = "eleccion";
      cuerpo.prepend(seccion);
    } else if (cambiar.classList.contains("f7") && cambiar.innerHTML === "♟") {
      let cuerpo: any = ""
      cuerpo = document.querySelector("div");
      cambiar.classList.add("coronado");
      this.coronado = true;
      const seccion = this.renderer.createElement("table");
      // Create a table for the player to choose the coronation piece
      for (let i = 0; i < this.negras.length - 2; i++) {
        const eleccion = this.renderer.createElement("td");
        eleccion.innerHTML = this.negras[i];
        // Add an event listener to handle the player's choice
        eleccion.addEventListener("click", () => {
          this.elegirfigura(eleccion);
        });
        seccion.append(eleccion);
      }
      seccion.className = "eleccion";
      cuerpo.append(seccion);
    }
  }

  /**
  * This function is responsible for declaring the end of the game and displaying a victory message.
  * It sets the 'ganador' flag to true and displays a Swal alert with the victor's color.
  */
  victoria() {
    this.ganador = true;
    Swal.fire({
      title: 'Partida Terminada',
      text: "Han ganado las " + this.color,
      icon: 'info',
      confirmButtonText: '¡De acuerdo!'
    })
  }

  /**
  * This function is responsible for declaring the end of the game in a stalemate.
  * It sets the 'ganador' flag to true, sets the 'tablas' flag to true, and displays a Swal alert with the appropriate message.
  * @param pedido - An optional boolean parameter that indicates whether the game is being declared in a stalemate due to a player's request.
  */
  async empate(pedido?: boolean) {
    if (!this.ganador) {
      if (pedido) {
        if (this.turno) {
          const tablas = await Swal.fire({
            title: 'Tablas',
            text: 'Las blancas piden tablas',
            icon: 'question',
            showCancelButton: true,
            cancelButtonAriaLabel: "Cancelar",
            confirmButtonText: '!De acuerdo!'
          })
          if (tablas.isConfirmed) {
            this.empate();
          }
        } else {
          const tablas = await Swal.fire({
            title: 'Tablas',
            text: 'Las negras piden tablas',
            icon: 'question',
            showCancelButton: true,
            cancelButtonAriaLabel: "Cancelar",
            confirmButtonText: '!De acuerdo!'
          })
          if (tablas.isConfirmed) {
            this.empate();
          }
        }
      } else {
        this.ganador = true;
        this.tablas = true;
        this.valores[0].filas = this.tablero;
        this.valores[0].turno = this.turno;
        this.valores[0].fichas = this.fichas;
        this.valores[0].acabado = this.ganador;
        this.valores[0].tablas = this.tablas;
        // Send the updated game data to the server
        this.partidasServices.updatePartida(this.valores).subscribe();
        Swal.fire({
          title: 'Terminada',
          text: 'La partida ha acabado en tablas',
          icon: 'info',
          confirmButtonText: '¡De acuerdo!'
        })
      }
    }
  }
  /**
   * This function is responsible for handling the movement of pawns in the game.
   * It checks the validity of the move based on the pawn's position and the color of the player.
   * It also handles en passant and pawn promotion.
   * @param fila - The row number of the pawn's current position.
   * @param columna - The column number of the pawn's current position.
   * @param color - The color of the player (either "blancas" or "negras").
   */
  moverPeon(fila: any, columna: any, color: any) {
    if (color === "blancas") {
      // Check for valid diagonal captures
      for (let i = 0; i < 2; i++) {
        const f = document.getElementsByClassName("c" + columna)[fila - 1];
        if (i % 2 !== 0) {
          const c = document.getElementsByClassName("f" + fila)[columna + 1];
          if (c && f) {
            const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0];
            if (casilla) {
              for (let i = 0; i < this.negras.length; i++) {
                if (casilla.innerHTML === this.negras[i]) {
                  casilla.classList.add("valida");
                }
              }
            }
          }
        } else {
          const c = document.getElementsByClassName("f" + fila)[columna - 1];
          if (c && f) {
            const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0];
            if (casilla) {
              for (let i = 0; i < this.negras.length; i++) {
                if (casilla.innerHTML === this.negras[i]) {
                  casilla.classList.add("valida");
                }
              }
            }
          }
        }
      }
      // Check for valid pawn two-square move
      const peon1 = document.getElementsByClassName("c" + columna)[fila];
      if (peon1.classList.contains("f6")) {
        const casilla = document.getElementsByClassName("c" + columna)[fila - 2];
        if (casilla.innerHTML === "" && document.getElementsByClassName("c" + columna)[fila - 1].innerHTML === "") {
          casilla.classList.add("valida");
        }
      }
      // Check for valid pawn single-square move
      const casilla = document.getElementsByClassName("c" + columna)[fila - 1];
      if (casilla.innerHTML === "") {
        casilla.classList.add("valida");
      }
    } else {
      // Check for valid diagonal captures
      for (let i = 0; i < 2; i++) {
        const f = document.getElementsByClassName("c" + columna)[fila + 1];
        if (i % 2 !== 0) {
          const c = document.getElementsByClassName("f" + fila)[columna + 1];
          if (c && f) {
            const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0];
            if (casilla) {
              for (let i = 0; i < this.negras.length; i++) {
                if (casilla.innerHTML === this.blancas[i]) {
                  casilla.classList.add("valida");
                }
              }
            }
          }
        } else {
          const c = document.getElementsByClassName("f" + fila)[columna - 1];
          if (c && f) {
            const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0];
            if (casilla) {
              for (let i = 0; i < this.negras.length; i++) {
                if (casilla.innerHTML === this.blancas[i]) {
                  casilla.classList.add("valida");
                }
              }
            }
          }
        }
      }
      // Check for valid pawn two-square move
      const peon1 = document.getElementsByClassName("c" + columna)[fila];
      if (peon1.classList.contains("f1")) {
        const casilla = document.getElementsByClassName("c" + columna)[fila + 2];
        if (casilla.innerHTML === "" && document.getElementsByClassName("c" + columna)[fila + 1].innerHTML === "") {
          casilla.classList.add("valida");
        }
      }
      // Check for valid pawn single-square move
      const casilla = document.getElementsByClassName("c" + columna)[fila + 1];
      if (casilla.innerHTML === "") {
        casilla.classList.add("valida");
      }
    }
  }

  /**
 * This function is responsible for handling the movement of the king in the game.
 * It checks the validity of the move based on the king's position and the color of the player.
 * It also handles castling.
 * @param fila - The row number of the king's current position.
 * @param columna - The column number of the king's current position.
 * @returns {void}
 */
  moverRey(fila: any, columna: any) {
    for (let i = 1; i <= 9; i++) {
      let valor_c: any;
      let valor_f: any;
      let simbolo_c: any;
      let simbolo_f: any;
      let operar_f: any;
      let operar_c: any;
      if (i % 2 !== 0) {
        valor_c = 1
        valor_f = 1;
      } else if (i === 2 || i === 8) {
        valor_c = 0;
        valor_f = 1;
      } else {
        valor_c = 1;
        valor_f = 0;
      }
      if (i === 1 || i === 4 || i === 7) {
        simbolo_c = "-"
      } else {
        simbolo_c = "+";
      }
      if (i <= 3) {
        simbolo_f = "-";
      } else {
        simbolo_f = "+";
      }
      operar_f = (fila + "" + simbolo_f + "" + valor_f);
      operar_c = (columna + "" + simbolo_c + "" + valor_c);
      operar_c = eval(operar_c);
      operar_f = eval(operar_f);
      const f = document.getElementsByClassName("c" + columna)[operar_f];
      const c = document.getElementsByClassName("f" + fila)[operar_c];
      if (c && f) {
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0];
        if (casilla) {
          if (casilla.innerHTML === "") {
            casilla.classList.add("valida");
          } else {
            for (let i = 0; i < this.negras.length; i++) {
              if (casilla.innerHTML === this.negras[i] && this.color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[i] && this.color === "negras") {
                casilla.classList.add("valida");
              }
            }
          }
        }
      }
    }
  }
  /**
 * This function is responsible for handling the movement of the knight in the game.
 * It checks the validity of the move based on the knight's position and the color of the player.
 * @param fila - The row number of the knight's current position.
 * @param columna - The column number of the knight's current position.
 * @param color - The color of the player (either "blancas" or "negras").
 * @returns {void}
 */
  moverCaballo(fila: any, columna: any, color: any) {
    for (let i = 1; i <= 8; i++) {
      let valor_c: any;
      let valor_f: any;
      let simbolo_f: any;
      let simbolo_c: any;
      let operar_f: any;
      let operar_c: any;
      if (i <= 4) {
        valor_c = 2;
        valor_f = 1;
      } else {
        valor_c = 1;
        valor_f = 2;
      }
      if (i % 2 === 0) {
        simbolo_f = "+";
      } else {
        simbolo_f = "-";
      }
      if (i <= 2 || i >= 7) {
        simbolo_c = "+";
      } else {
        simbolo_c = "-";
      }
      operar_f = (fila + simbolo_f + valor_f) as unknown as any;
      operar_c = (columna + simbolo_c + valor_c) as unknown as any;
      operar_c = eval(operar_c);
      operar_f = eval(operar_f);
      if (operar_c < 0 || operar_f < 0 || operar_c > 7 || operar_f > 7) {
        continue;
      } else {
        const f = document.getElementsByClassName("c" + columna)[operar_f];
        const c = document.getElementsByClassName("f" + fila)[operar_c];
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0] as HTMLElement;
        if (casilla) {
          if (casilla.innerHTML === "") {
            casilla.classList.add("valida");
          } else {
            for (let i = 0; i < this.negras.length; i++) {
              if (casilla.innerHTML === this.negras[i] && color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[i] && color === "negras") {
                casilla.classList.add("valida");
              }
            }
          }
        }
      }
    }
  }
  /**
  * This function is responsible for handling the movement of the rook in the game.
  * It checks the validity of the move based on the rook's position and the color of the player.
  * It also handles castling.
  * @param fila - The row number of the rook's current position.
  * @param columna - The column number of the rook's current position.
  * @param color - The color of the player (either "blancas" or "negras").
  * @returns {void}
  */
  moverTorre(fila: number, columna: number, color: string) {
    // Get the current position of the rook
    const positorre = document.getElementsByClassName("f" + fila + " " + "c" + columna)[0] as HTMLElement;

    // Check for valid rook move upwards
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      if (!casilla) {
        break;
      } else {
        if (casilla.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla.innerHTML === this.negras[j] && color === "blancas") {
              casilla.classList.add("valida");
            } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
              casilla.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla.classList.add("valida");
        }
      }
    }

    // Check for valid rook move downwards
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      if (!casilla) {
        break;
      } else {
        if (casilla.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla.innerHTML === this.negras[j] && color === "blancas") {
              casilla.classList.add("valida");
            } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
              casilla.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla.classList.add("valida");
        }
      }
    }

    // Check for valid rook move to the right
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!casilla) {
        break;
      } else {
        if (casilla.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla.innerHTML === this.negras[j] && color === "blancas") {
              casilla.classList.add("valida");
            } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
              casilla.classList.add("valida");
            }
          }
          if (casilla.innerHTML === "♔" && color === "blancas"
            && casilla.className === "f7 c3"
            && positorre.className === "f7 c0") {
            casilla.classList.add("enroque");
          }
          else if (casilla.innerHTML === "♚" && color === "negras"
            && casilla.className === "f0 c4"
            && positorre.className === "f0 c0") {
            casilla.classList.add("enroque");
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla.classList.add("valida");
        }
      }
    }

    // Check for valid rook move to the left
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!casilla) {
        break;
      } else {
        if (casilla.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla.innerHTML === this.negras[j] && color === "blancas") {
              casilla.classList.add("valida");
            } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
              casilla.classList.add("valida");
            }
          }
          // Check for castling conditions
          if (casilla.innerHTML === "♔" && color === "blancas"
            && casilla.className === "f7 c3"
            && positorre.className === "f7 c7") {
            casilla.classList.add("enroque");
          }
          else if (casilla.innerHTML === "♚" && color === "negras"
            && casilla.className === "f0 c4"
            && positorre.className === "f0 c7") {
            casilla.classList.add("enroque");
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla.classList.add("valida");
        }
      }
    }
  }
  /**
 * This function is responsible for handling the movement of the bishop in the game.
 * It checks the validity of the move based on the bishop's position and the color of the player.
 * @param fila - The row number of the bishop's current position.
 * @param columna - The column number of the bishop's current position.
 * @param color - The color of the player (either "blancas" or "negras").
 * @returns {void}
 */
  moverAlfil(fila: number, columna: number, color: string) {
    for (let i = 1; i <= 8; i++) {
      const f = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      const c = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!c || !f) {
        break;
      } else {
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0] as HTMLElement;
        if (!casilla) {
          break;
        } else {
          if (casilla.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla.innerHTML === this.negras[j] && color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
                casilla.classList.add("valida");
              }
            }
            break;
          } else {
            casilla.classList.add("valida");
          }
        }
      }
    }
    for (let i = 1; i <= 8; i++) {
      const f = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      const c = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!c || !f) {
        break;
      } else {
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0] as HTMLElement;
        if (!casilla) {
          break;
        } else {
          if (casilla.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla.innerHTML === this.negras[j] && color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
                casilla.classList.add("valida");
              }
            }
            break;
          } else {
            casilla.classList.add("valida");
          }
        }
      }
    }
    for (let i = 1; i <= 8; i++) {
      const f = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      const c = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!c || !f) {
        break;
      } else {
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0] as HTMLElement;
        if (!casilla) {
          break;
        } else {
          if (casilla.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla.innerHTML === this.negras[j] && color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
                casilla.classList.add("valida");
              }
            }
            break;
          } else {
            casilla.classList.add("valida");
          }
        }
      }
    }
    for (let i = 1; i <= 8; i++) {
      const f = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      const c = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!c || !f) {
        break;
      } else {
        const casilla = document.getElementsByClassName(f.classList[0] + " " + c.classList[1])[0] as HTMLElement;
        if (!casilla) {
          break;
        } else {
          if (casilla.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla.innerHTML === this.negras[j] && color === "blancas") {
                casilla.classList.add("valida");
              } else if (casilla.innerHTML === this.blancas[j] && color === "negras") {
                casilla.classList.add("valida");
              }
            }
            break;
          } else {
            casilla.classList.add("valida");
          }
        }
      }
    }
  }
  /**
 * This function is responsible for handling the movement of the queen in the game.
 * It checks the validity of the move based on the queen's position and the color of the player.
 * @param fila - The row number of the queen's current position.
 * @param columna - The column number of the queen's current position.
 * @param color - The color of the player (either "blancas" or "negras").
 * @returns {void}
 */
  moverReina(fila: number, columna: number, color: string) {
    // Check for valid queen move upwards
    for (let i = 1; i <= 8; i++) {
      const casilla1 = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      if (!casilla1) {
        break;
      } else {
        if (casilla1.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla1.innerHTML === this.negras[j] && color === "blancas") {
              casilla1.classList.add("valida");
            } else if (casilla1.innerHTML === this.blancas[j] && color === "negras") {
              casilla1.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla1.classList.add("valida");
        }
      }
    }

    // Check for valid queen move downwards
    for (let i = 1; i <= 8; i++) {
      const casilla2 = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      if (!casilla2) {
        break;
      } else {
        if (casilla2.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla2.innerHTML === this.negras[j] && color === "blancas") {
              casilla2.classList.add("valida");
            } else if (casilla2.innerHTML === this.blancas[j] && color === "negras") {
              casilla2.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla2.classList.add("valida");
        }
      }
    }

    // Check for valid queen move to the right
    for (let i = 1; i <= 8; i++) {
      const casilla3 = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!casilla3) {
        break;
      } else {
        if (casilla3.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla3.innerHTML === this.negras[j] && color === "blancas") {
              casilla3.classList.add("valida");
            } else if (casilla3.innerHTML === this.blancas[j] && color === "negras") {
              casilla3.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla3.classList.add("valida");
        }
      }
    }

    // Check for valid queen move to the left
    for (let i = 1; i <= 8; i++) {
      const casilla4 = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!casilla4) {
        break;
      } else {
        if (casilla4.innerHTML !== "") {
          // Check if the move is valid for capturing an opponent's piece
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla4.innerHTML === this.negras[j] && color === "blancas") {
              casilla4.classList.add("valida");
            } else if (casilla4.innerHTML === this.blancas[j] && color === "negras") {
              casilla4.classList.add("valida");
            }
          }
          break;
        } else {
          // Add valid move class to empty squares
          casilla4.classList.add("valida");
        }
      }
    }

    // Check for valid queen move diagonally upwards and to the right
    for (let i = 1; i <= 8; i++) {
      const f1 = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      const c1 = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!c1 || !f1) {
        break;
      } else {
        const casilla1 = document.getElementsByClassName(f1.classList[0] + " " + c1.classList[1])[0] as HTMLElement;
        if (!casilla1) {
          break;
        } else {
          if (casilla1.innerHTML !== "") {
            // Check if the move is valid for capturing an opponent's piece
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla1.innerHTML === this.negras[j] && color === "blancas") {
                casilla1.classList.add("valida");
              } else if (casilla1.innerHTML === this.blancas[j] && color === "negras") {
                casilla1.classList.add("valida");
              }
            }
            break;
          } else {
            // Add valid move class to empty squares
            casilla1.classList.add("valida");
          }
        }
      }
    }

    // Check for valid queen move diagonally downwards and to the left
    for (let i = 1; i <= 8; i++) {
      const f2 = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      const c2 = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!c2 || !f2) {
        break;
      } else {
        const casilla2 = document.getElementsByClassName(f2.classList[0] + " " + c2.classList[1])[0] as HTMLElement;
        if (!casilla2) {
          break;
        } else {
          if (casilla2.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla2.innerHTML === this.negras[j] && color === "blancas") {
                casilla2.classList.add("valida");
              } else if (casilla2.innerHTML === this.blancas[j] && color === "negras") {
                casilla2.classList.add("valida");
              }
            }
            break;
          } else {
            casilla2.classList.add("valida");
          }
        }
      }
    }

    // Check for valid queen move diagonally downwards and to the right
    for (let i = 1; i <= 8; i++) {
      const f3 = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      const c3 = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
      if (!c3 || !f3) {
        break;
      } else {
        const casilla3 = document.getElementsByClassName(f3.classList[0] + " " + c3.classList[1])[0] as HTMLElement;
        if (!casilla3) {
          break;
        } else {
          if (casilla3.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla3.innerHTML === this.negras[j] && color === "blancas") {
                casilla3.classList.add("valida");
              } else if (casilla3.innerHTML === this.blancas[j] && color === "negras") {
                casilla3.classList.add("valida");
              }
            }
            break;
          } else {
            casilla3.classList.add("valida");
          }
        }
      }
    }

    // Check for valid queen move diagonally upwards and to the left
    for (let i = 1; i <= 8; i++) {
      const f4 = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
      const c4 = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
      if (!c4 || !f4) {
        break;
      } else {
        const casilla4 = document.getElementsByClassName(f4.classList[0] + " " + c4.classList[1])[0] as HTMLElement;
        if (!casilla4) {
          break;
        } else {
          if (casilla4.innerHTML !== "") {
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla4.innerHTML === this.negras[j] && color === "blancas") {
                casilla4.classList.add("valida");
              } else if (casilla4.innerHTML === this.blancas[j] && color === "negras") {
                casilla4.classList.add("valida");
              }
            }
            break;
          } else {
            casilla4.classList.add("valida");
          }
        }
      }
    }
  }
}
