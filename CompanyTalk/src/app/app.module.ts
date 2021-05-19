import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EdicaoDadosComponent } from './components/edicao-dados/edicao-dados.component';
import { EdicaoFeedComponent } from './components/edicao-feed/edicao-feed.component';
import { ImpressaoRelatoriosComponent } from './components/impressao-relatorios/impressao-relatorios.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { EdicaoReuniaoComponent } from './components/edicao-reuniao/edicao-reuniao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NaviComponent } from './components/navi/navi.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EdicaoDadosComponent,
    EdicaoFeedComponent,
    ImpressaoRelatoriosComponent,
    FooterComponent,
    PerfilComponent,
    EdicaoReuniaoComponent,
    NaviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
