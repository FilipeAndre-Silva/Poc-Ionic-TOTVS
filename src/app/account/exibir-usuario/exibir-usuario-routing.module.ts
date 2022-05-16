import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirUsuarioPage } from './exibir-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ExibirUsuarioPage
  },
  {
    path: 'deletar/:id',
    loadChildren: () => import('../deletar/deletar.module').then( m => m.DeletarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirUsuarioPageRoutingModule {}
