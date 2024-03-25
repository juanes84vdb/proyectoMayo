import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AjedrezComponent } from './componentes/ajedrez/ajedrez.component';

const routes: Routes = [  
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent },
{ path: 'Ajedrez', component: AjedrezComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
