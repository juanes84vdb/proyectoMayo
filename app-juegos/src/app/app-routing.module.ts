import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AjedrezComponent } from './componentes/ajedrez/ajedrez.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './componentes/login/login.component';
import { NuevaComponent } from './componentes/nueva/nueva.component';

const routes: Routes = [  
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent },
{ path: 'login', component: LoginComponent },
{ path: 'Ajedrez', component: AjedrezComponent, canActivate: [loginGuard] },
{ path: 'nuevo', component: NuevaComponent, canActivate: [loginGuard] },
/*
{ path: 'partidas', component: , canActivate: [loginGuard] },
{ path: 'partidas/:juego', component: , canActivate: [loginGuard] },
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
