import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AjedrezComponent } from './componentes/ajedrez/ajedrez.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './componentes/login/login.component';
import { NuevaComponent } from './componentes/nueva/nueva.component';
import { PartidasComponent } from './componentes/partidas/partidas.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [  
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component:RegistroComponent},
{ path: 'Ajedrez', component: AjedrezComponent, canActivate: [loginGuard] },
{ path: 'Ajedrez/:partida', component: AjedrezComponent, canActivate: [loginGuard] },
{ path: 'nuevo', component: NuevaComponent, canActivate: [loginGuard] },
{ path: 'partidas', component:PartidasComponent , canActivate: [loginGuard] },
{ path: 'partidas/:juego', component:PartidasComponent , canActivate: [loginGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
