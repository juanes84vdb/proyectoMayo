import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabezeraComponent } from './componentes/cabezera/cabezera.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AjedrezComponent } from './componentes/ajedrez/ajedrez.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevaComponent } from './componentes/nueva/nueva.component';
import { PartidasComponent } from './componentes/partidas/partidas.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';


import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { StyleClassModule as PrimeStyleClassModule } from 'primeng/styleclass';
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { AdminComponent } from './componentes/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    CabezeraComponent,
    InicioComponent,
    AjedrezComponent,
    LoginComponent,
    NuevaComponent,
    PartidasComponent,
    RegistroComponent,
    RankingComponent,
    PerfilComponent,
    UsuariosComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    PrimeStyleClassModule,
    PrimeRippleModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
