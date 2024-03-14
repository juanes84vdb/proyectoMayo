import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabezeraComponent } from './componentes/cabezera/cabezera.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CabezeraComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
