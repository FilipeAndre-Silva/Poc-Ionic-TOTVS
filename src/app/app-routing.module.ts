import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'exibir-usuario/:id',
    loadChildren: () => import('./exibir-usuario/exibir-usuario.module').then( m => m.ExibirUsuarioPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'alterar/:id',
    loadChildren: () => import('./alterar/alterar.module').then( m => m.AlterarPageModule)
  },
  {
    path: 'deletar/:id',
    loadChildren: () => import('./deletar/deletar.module').then( m => m.DeletarPageModule)
  },
  {
    path: 'leitura-codigo-de-barras',
    loadChildren: () => import('./leitura-codigo-de-barras/leitura-codigo-de-barras.module').then( m => m.LeituraCodigoDeBarrasPageModule)
  },  {
    path: 'bluetooth',
    loadChildren: () => import('./bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
