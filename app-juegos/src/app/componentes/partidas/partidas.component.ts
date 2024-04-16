import { Component } from '@angular/core';
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
}