import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {        
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'account/exibir-usuario/:id',
        loadChildren: () => import('../exibir-usuario/exibir-usuario.module').then( m => m.ExibirUsuarioPageModule)
      },
      {
        path: 'account/deletar/:id',
        loadChildren: () => import('../deletar/deletar.module').then( m => m.DeletarPageModule)
      },
      {
        path: 'account/alterar/:id',
        loadChildren: () => import('../alterar/alterar.module').then( m => m.AlterarPageModule)
      },
      {
        path: 'account/cadastrar',
        loadChildren: () => import('../cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
      },
      {
        path: 'leitura-codigo-de-barras',
        loadChildren: () => import('../leitura-codigo-de-barras/leitura-codigo-de-barras.module').then(m => m.LeituraCodigoDeBarrasPageModule)
      },
      {
        path: 'bluetooth',
        loadChildren: () => import('../bluetooth/bluetooth.module').then(m => m.BluetoothPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)      
      },
      {
        path: '',
        redirectTo: '/tabs/account',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/account',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
