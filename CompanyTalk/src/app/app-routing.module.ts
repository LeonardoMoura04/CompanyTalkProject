import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EdicaoDadosComponent } from './components/edicao-dados/edicao-dados.component';
import { EdicaoFeedComponent } from './components/edicao-feed/edicao-feed.component';
import { EdicaoReuniaoComponent } from './components/edicao-reuniao/edicao-reuniao.component';
import { ImpressaoRelatoriosComponent } from './components/impressao-relatorios/impressao-relatorios.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'dashboard/:pessoaId', component: DashboardComponent },
  { path: 'edicaoDados/:pessoaId', component: EdicaoDadosComponent },
  { path: 'edicaoFeed/:pessoaId/:feedId', component: EdicaoFeedComponent },
  { path: 'edicaoReuniao/:pessoaId/:reuniaoId', component: EdicaoReuniaoComponent },
  { path: 'impressaoRelatorios', component: ImpressaoRelatoriosComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

// const routes: Routes = [
//   { path: 'dashboard/:id', component: DashboardComponent },
//   { path: 'edicaoDados/:id', component: EdicaoDadosComponent },
//   { path: 'edicaoFeed/:id', component: EdicaoFeedComponent },
//   { path: 'impressaoRelatorios/:id', component: ImpressaoRelatoriosComponent },
//   { path: 'login', component: LoginComponent },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
