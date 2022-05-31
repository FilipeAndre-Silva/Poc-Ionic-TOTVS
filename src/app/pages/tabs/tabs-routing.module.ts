import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'display-orders'
  },
  {
    path: '',
    component: TabsPage,   
    children:[
      {        
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
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
        path: 'display-orders',
        loadChildren: () => import('../display-orders/display-orders.module').then(m => m.DisplayOrdersPageModule)      
      },
      {
        path: 'display-orders-finalized',
        loadChildren: () => import('../display-orders-finalized/display-orders-finalized.module').then(m => m.DisplayOrdersFinalizedPageModule)      
      }
      /* {
        path: 'payment',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)      
      } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
