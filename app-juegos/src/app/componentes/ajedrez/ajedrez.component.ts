import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-ajedrez',
  templateUrl: './ajedrez.component.html',
  styleUrls: ['./ajedrez.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AjedrezComponent {
  @ViewChild('tablero') tablerohtml!: ElementRef;
  id:any|null=null;
  tablero: any[][] = [];
  segundosTranscurridos = 0;
  blancas: any[] = ["♖", "♘", "♗", "♕", "♔", "♙"];
  negras: any[] = ["♜", "♞", "♝", "♛", "♚", "♟"];
  turno: boolean = true;
  color: any | null = null;
  coronado: boolean = false;
  ganador: boolean = false;
  tablas: boolean = false;
  fichas: any
  colort: string = ""
  valores:any
  constructor(private renderer: Renderer2,
    private partidasServices: PartidasService,
    private activatedRoute: ActivatedRoute,
    private usuariosService:UsuariosService) {
      this.recuperarYo()
      this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
        this.id = param.get('partida')!;
      });
      const data = {
        id : this.id
      };
    this.recuperarJuegos(data);
  }

  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {
      },
      (error)=> {
        alert("La sesion ha caducado, Vuelva a iniciar sesion")
        window.location.pathname = "/login"
    });
  }
  ngAfterViewInit(): void {
    const intervalo = setInterval(() => {
      this.segundosTranscurridos++;
      if (this.tablero.length > 0) {
        this.dibujarTabla(this.tablero);
        clearInterval(intervalo);
      }
      if (this.segundosTranscurridos >= 10) {
        clearInterval(intervalo);
      }
    }, 1000);
  }

  recuperarJuegos(id:any) {
    this.partidasServices.retornarTablero(id).subscribe(
      (response) => {
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
        this.id=response[0].id
        this.fichas=response[0].fichas
        this.valores=response
    },
    (error)=>{
      alert("No se ha podido recuperar la partida intentelo mas tarde")
      window.location.pathname = ""
    }
    );
  }
  dibujarTabla(tablero: any[][]) {
    if (this.turno === true) {
      this.colort = "Blancas"
    }
    else {
      this.colort = "Negras"
    }
    this.color = null;
    this.coronado = false;
    const seccion = this.renderer.createElement("tr");
    seccion.innerHTML = '<th></th>';
    for (let i = 0; i < 8; i++) {
      seccion.innerHTML += "<th>" + i + "</th>";
    }
    this.renderer.appendChild(this.tablerohtml.nativeElement, seccion);
    for (let fila = 0; fila < 8; fila++) {
      const seccion = this.renderer.createElement("tr");
      seccion.innerHTML = "<th>" + fila + "</th>";
      for (let columna = 0; columna < 8; columna++) {
        const celda = this.renderer.createElement("td");
        celda.innerHTML = tablero[fila][columna];
        celda.className = "f" + fila;
        celda.classList.add("c" + columna);
        celda.draggable = true;
        celda.addEventListener('dragover', (e: any) => {
          e.preventDefault();
        });
        celda.addEventListener('dragstart', (e: any) => {
          if (!this.ganador) {
            for (let i = 0; i < this.negras.length; i++) {
              if (celda.innerHTML == this.negras[i]) {
                this.color = "negras";
              }
              else if (celda.innerHTML == this.blancas[i]) {
                this.color = "blancas";
              }
            }
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
        celda.addEventListener("dragend", () => {
          const valida = document.getElementsByClassName("valida");
          const cambiar = document.getElementsByClassName("cambiar")[0] as HTMLElement;
          const enrocar = document.getElementsByClassName("enroque");
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
          for (let i = 0; i < enrocar.length; i++) {
            enrocar[0].classList.remove("enroque");
          }
          for (let i = 0; i < 64; i++) {
            if(valida[0]) {
            valida[0].classList.remove("valida");
            }
          }
        });
        celda.addEventListener("dragenter", function (e: any) {
          e.preventDefault();
          if (celda.classList.contains("valida") || celda.classList.contains("enroque")) {
            celda.classList.add("cambiar");
          }
        });
        celda.addEventListener("dragleave", function (e: any) {
          e.preventDefault();
          celda.classList.remove("cambiar");
        });
        seccion.appendChild(celda);
      }
      this.renderer.appendChild(this.tablerohtml.nativeElement, seccion);
    }
  }
  mover(cambiar: HTMLElement, celda: HTMLElement) {
    if (cambiar.innerHTML !== "") {
      this.comido(cambiar);
    }
    cambiar.innerHTML = celda.innerHTML;
    celda.innerHTML = "";
    this.turno = !this.turno;
    if (this.turno === true) {
      this.colort = "Blancas"
    }
    else {
      this.colort = "Negras"
    }
    const casiilas = document.getElementsByTagName("td")

    for (let j = 0; j <= 7; j++) {
      let x = 0
      for (let i = j * 8; i < j * 8 + 8; i++, x++) {
        this.tablero[j][x] = casiilas[i].innerHTML
      }
    }
    this.valores[0].filas=this.tablero;
    this.valores[0].turno=this.turno;
    this.valores[0].fichas=this.fichas;
    this.valores[0].acabado=this.ganador;
    this.valores[0].tablas=this.tablas;
    this.partidasServices.updatePartida(this.valores).subscribe();
  }

  comido(cambiar: HTMLElement) {
    this.fichas = this.fichas - 1;
    if (!this.turno) {
      const cementerio = document.getElementsByTagName("article")[0];
      if (cambiar.innerHTML === "♙") {
        cementerio.innerHTML = cambiar.innerHTML + " " + cementerio.innerHTML;
      } else {
        cementerio.innerHTML = cementerio.innerHTML + " " + cambiar.innerHTML;
      }
    } else {
      const cementerio = document.getElementsByTagName("article")[1];
      if (cambiar.innerHTML === "♟") {
        cementerio.innerHTML = cambiar.innerHTML + " " + cementerio.innerHTML;
      } else {
        cementerio.innerHTML = cementerio.innerHTML + " " + cambiar.innerHTML;
      }
    }
    if (this.fichas === 0) {
      this.empate();
    }
  }

  enroque(cambiar: HTMLElement, celda: HTMLElement) {
    if (this.turno) {
      if (celda.classList.contains("c0")) {
        const posirey = document.getElementsByClassName("f7 c1")[0];
        const positorre = document.getElementsByClassName("f7 c2")[0];
        posirey.innerHTML = "♔";
        positorre.innerHTML = "♖";
      } else {
        const posirey = document.getElementsByClassName("f7 c6")[0];
        const positorre = document.getElementsByClassName("f7 c5")[0];
        posirey.innerHTML = "♔";
        positorre.innerHTML = "♖";
      }
    } else {
      if (celda.classList.contains("c0")) {
        const posirey = document.getElementsByClassName("f0 c1")[0];
        const positorre = document.getElementsByClassName("f0 c2")[0];
        posirey.innerHTML = "♚";
        positorre.innerHTML = "♜";
      } else {
        const posirey = document.getElementsByClassName("f0 c6")[0];
        const positorre = document.getElementsByClassName("f0 c5")[0];
        posirey.innerHTML = "♚";
        positorre.innerHTML = "♜";
      }
    }
    cambiar.innerHTML = "";
    celda.innerHTML = "";
    this.turno = !this.turno;
  }

  elegirfigura(elegido: HTMLElement) {
    const cambiar = document.getElementsByClassName("coronado")[0] as HTMLElement;
    cambiar.innerHTML = elegido.innerHTML;
    this.coronado = false;
    cambiar.classList.remove("coronado");
    const borrar = document.getElementsByClassName("eleccion")[0] as HTMLElement;
    borrar.remove();
  }

  coronar(cambiar: HTMLElement) {
    if (cambiar.classList.contains("f0") && cambiar.innerHTML === "♙") {
      let cuerpo: any = ""
      cuerpo = document.querySelector("div");
      cambiar.classList.add("coronado");
      this.coronado = true;
      const seccion = this.renderer.createElement("table");
      for (let i = 0; i < this.blancas.length - 2; i++) {
        const eleccion = this.renderer.createElement("td");
        eleccion.innerHTML = this.blancas[i];
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
      for (let i = 0; i < this.negras.length - 2; i++) {
        const eleccion = this.renderer.createElement("td");
        eleccion.innerHTML = this.negras[i];
        eleccion.addEventListener("click", () => {
          this.elegirfigura(eleccion);
        });
        seccion.append(eleccion);
      }
      seccion.className = "eleccion";
      cuerpo.append(seccion);
    }
  }

  victoria() {
    this.ganador = true;
    alert("Han ganado las " + this.color);
  }

  empate(pedido?: boolean) {
    if (!this.ganador) {
      if (pedido) {
        if (this.turno) {
          const tablas = confirm("Las blancas piden tablas");
          if (tablas) {
            this.empate();
          }
        } else {
          const tablas = confirm("Las negras piden tablas");
          if (tablas) {
            this.empate();
          }
        }
      } else {
        this.ganador = true;
        this.tablas=true;
        alert("La partida ha acabado en tablas");
      }
    }
  }
  moverPeon(fila: any, columna: any, color: any) {
    if (color === "blancas") {
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
      const peon1 = document.getElementsByClassName("c" + columna)[fila];
      if (peon1.classList.contains("f6")) {
        const casilla = document.getElementsByClassName("c" + columna)[fila - 2];
        if (casilla.innerHTML === "" && document.getElementsByClassName("c" + columna)[fila - 1].innerHTML === "") {
          casilla.classList.add("valida");
        }
      }
      const casilla = document.getElementsByClassName("c" + columna)[fila - 1];
      if (casilla.innerHTML === "") {
        casilla.classList.add("valida");
      }
    } else {
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
      const peon1 = document.getElementsByClassName("c" + columna)[fila];
      if (peon1.classList.contains("f1")) {
        const casilla = document.getElementsByClassName("c" + columna)[fila + 2];
        if (casilla.innerHTML === "" && document.getElementsByClassName("c" + columna)[fila + 1].innerHTML === "") {
          casilla.classList.add("valida");
        }
      }
      const casilla = document.getElementsByClassName("c" + columna)[fila + 1];
      if (casilla.innerHTML === "") {
        casilla.classList.add("valida");
      }
    }
  }

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
  moverTorre(fila: number, columna: number, color: string) {
    const positorre = document.getElementsByClassName("f" + fila + " " + "c" + columna)[0] as HTMLElement;
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
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
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
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
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
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
          casilla.classList.add("valida");
        }
      }
    }
    for (let i = 1; i <= 8; i++) {
      const casilla = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
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
          casilla.classList.add("valida");
        }
      }
    }
  }
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
  moverReina(fila: number, columna: number, color: string) {
    for (let i = 1; i <= 8; i++) {
      const casilla1 = document.getElementsByClassName("c" + columna)[fila - i] as HTMLElement;
      if (!casilla1) {
        break;
      } else {
        if (casilla1.innerHTML !== "") {
          for (let j = 0; j < this.negras.length; j++) {
            if (casilla1.innerHTML === this.negras[j] && color === "blancas") {
              casilla1.classList.add("valida");
            } else if (casilla1.innerHTML === this.blancas[j] && color === "negras") {
              casilla1.classList.add("valida");
            }
          }
          break;
        } else {
          casilla1.classList.add("valida");
        }
      }
    }

    for (let i = 1; i <= 8; i++) {
      const casilla2 = document.getElementsByClassName("c" + columna)[fila + i] as HTMLElement;
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

    for (let i = 1; i <= 8; i++) {
      const casilla3 = document.getElementsByClassName("f" + fila)[columna + i] as HTMLElement;
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

    for (let i = 1; i <= 8; i++) {
      const casilla4 = document.getElementsByClassName("f" + fila)[columna - i] as HTMLElement;
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
            for (let j = 0; j < this.negras.length; j++) {
              if (casilla1.innerHTML === this.negras[j] && color === "blancas") {
                casilla1.classList.add("valida");
              } else if (casilla1.innerHTML === this.blancas[j] && color === "negras") {
                casilla1.classList.add("valida");
              }
            }
            break;
          } else {
            casilla1.classList.add("valida");
          }
        }
      }
    }

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
