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
 
  yo:number = 0;
  constructor(private partidasServices: PartidasService,
    private usuariosService:UsuariosService
    ) {
  //  const interval = Rx.Observable.interval(100).mapTo(this.recuperarYo()).take(3);
    this.recuperarYo();
  }

  recuperarPartidas(data:any) {
    this.partidasServices.PartidasUsuario(data).subscribe(
      (response) => {
        this.partidas=response;
    },
    (error)=>{
      alert("No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado")
      localStorage.removeItem('loggedInKey');
      window.location.pathname = ""
    });
  }

  recuperarYo() {
    this.usuariosService.retornarYo().subscribe(
      (response) => {

        this.yo=response[0].id;
        const data = {
          id: null,
          usuario: this.yo
        };
      this.recuperarPartidas(data);
    },
    (error)=>{
      alert("No se ha podido Conectar al servidor intentelo mas tarde, La sesion puede haber expirado")
      localStorage.removeItem('loggedInKey');
      window.location.pathname = ""
    }
    );
  }
}