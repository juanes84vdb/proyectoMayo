import { Component } from '@angular/core';
import { PartidasService } from 'src/app/servicios/partidas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent {
  partidas: any[] = []; 
 
  load=false;
  yo:number = 0;
  constructor(private partidasServices: PartidasService,
    private usuariosService:UsuariosService
    ) {
  //  const interval = Rx.Observable.interval(100).mapTo(this.recuperarYo()).take(3);
    this.recuperarYo();
    setTimeout(() => {
      this.load = true;
  }, 7500); 
  }

  recuperarPartidas(data:any) {
    this.partidasServices.PartidasUsuario(data).subscribe(response => {
      if (Array.isArray(response)) {
        this.partidas=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(response => {
      if (Array.isArray(response)) {
        this.yo=response[0].id;
        const data = {
          id: null,
          usuario: this.yo
        };
      this.recuperarPartidas(data);
      //  console.log(this.yo)
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }
}
