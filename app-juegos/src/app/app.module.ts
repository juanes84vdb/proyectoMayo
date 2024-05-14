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
import { BadgeModule as PrimeBadgeModule } from 'primeng/badge';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { CardModule as PrimeCardModule } from 'primeng/card';
import { ChipModule as PrimeChipModule } from 'primeng/chip';
import { DialogModule as PrimeDialogModule } from 'primeng/dialog';
import { DividerModule as PrimeDividerModule } from 'primeng/divider';
import { FieldsetModule as PrimeFieldsetModule } from 'primeng/fieldset';
import { InputNumberModule as PrimeInputNumberModule } from 'primeng/inputnumber';
import { InputTextModule as PrimeImputTextModule } from 'primeng/inputtext';
import { MessageModule as PrimeMessageModule } from 'primeng/message';
import { ProgressSpinnerModule as PrimeProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { ScrollPanelModule as PrimeScrollPanelModule } from 'primeng/scrollpanel';
import { StyleClassModule as PrimeStyleClassModule } from 'primeng/styleclass';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { TooltipModule as PrimeTooltipModule } from 'primeng/tooltip';;
import { AdminComponent } from './componentes/admin/admin.component';
import { ReportesComponent } from './componentes/admin/reportes/reportes.component';
import { BaneadosComponent } from './componentes/admin/baneados/baneados.component';
import { TresRayaComponent } from './componentes/tres-raya/tres-raya.component';



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
    ReportesComponent,
    BaneadosComponent,
    TresRayaComponent,
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
    BrowserAnimationsModule,
    PrimeBadgeModule,
    PrimeButtonModule,
    PrimeCardModule,
    PrimeChipModule,
    PrimeDividerModule,
    PrimeFieldsetModule,
    PrimeInputNumberModule,
    PrimeMessageModule,
    PrimeProgressSpinnerModule,
    PrimeRippleModule,
    PrimeScrollPanelModule,
    PrimeStyleClassModule,
    PrimeTableModule,
    PrimeTooltipModule,
    PrimeDialogModule,
    PrimeImputTextModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
