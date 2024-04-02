import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    RankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
