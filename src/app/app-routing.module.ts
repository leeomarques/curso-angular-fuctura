import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespesasComponent } from './lancamentos/despesas/despesas.component';
import { ReceitasComponent } from './lancamentos/receitas/receitas.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AutenticadorGuard } from './shared/seguranca/autenticador-guard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AutenticadorGuard],
  },
  {
    path: 'relatorios/despesa',
    component: DespesasComponent,
    canActivate: [AutenticadorGuard],
  },
  {
    path: 'relatorio/receita',
    component: ReceitasComponent,
    canActivate: [AutenticadorGuard],
  },
  {
    path: 'lancamentos',
    loadChildren: () =>
      import('./lancamentos/lancamentos.module').then(
        (m) => m.LancamentosModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
