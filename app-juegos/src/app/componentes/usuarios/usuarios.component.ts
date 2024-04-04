import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  perfil:any[]=[]
  load=false;
  color:any
  foto:any
  id:any|null=null;
  constructor( private activatedRoute: ActivatedRoute,
    private usuariosService:UsuariosService){
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('usuario')!;
    });
    const data={
      id:this.id
    }
    this.recuperarUsuario(data);
  }
 
 
  recuperarUsuario(data:any) {
    this.usuariosService.usuario(data).subscribe(
      (response) => {
        this.perfil=response;
        this.color=response[0].color;
      },
      (error) => {
        this.load = true;
      }
    );
  }
}
