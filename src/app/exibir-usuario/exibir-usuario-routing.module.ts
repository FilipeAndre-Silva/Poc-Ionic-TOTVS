import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirUsuarioPage } from './exibir-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ExibirUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirUsuarioPageRoutingModule {}
