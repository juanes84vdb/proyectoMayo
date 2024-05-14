import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AjedrezComponent } from './componentes/ajedrez/ajedrez.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './componentes/login/login.component';
import { NuevaComponent } from './componentes/nueva/nueva.component';
import { PartidasComponent } from './componentes/partidas/partidas.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ReportesComponent } from './componentes/admin/reportes/reportes.component';
import { BaneadosComponent } from './componentes/admin/baneados/baneados.component';
import { TresRayaComponent } from './componentes/tres-raya/tres-raya.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'usuario/:usuario', component: UsuariosComponent },
  { path: 'Ajedrez/:partida', component: AjedrezComponent, canActivate: [loginGuard] },
  { path: 'Tres en Raya/:partida', component: TresRayaComponent, canActivate: [loginGuard] },
  { path: 'nuevo', component: NuevaComponent, canActivate: [loginGuard] },
  { path: 'partidas', component: PartidasComponent, canActivate: [loginGuard] },
  { path: 'partidas/:juego', component: PartidasComponent, canActivate: [loginGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [loginGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [loginGuard]},
  { path: 'admin/reportes', component: ReportesComponent, canActivate: [loginGuard]},
  { path: 'admin/baneados', component: BaneadosComponent, canActivate: [loginGuard]},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
