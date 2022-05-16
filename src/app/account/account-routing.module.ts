import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }, 
  {
    path: 'exibir-usuario/:id',
    loadChildren: () => import('./exibir-usuario/exibir-usuario.module').then( m => m.ExibirUsuarioPageModule)
  },
  {
    path: 'deletar/:id',
    loadChildren: () => import('./deletar/deletar.module').then( m => m.DeletarPageModule)
  },
  {
    path: 'alterar/:id',
    loadChildren: () => import('./alterar/alterar.module').then( m => m.AlterarPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
