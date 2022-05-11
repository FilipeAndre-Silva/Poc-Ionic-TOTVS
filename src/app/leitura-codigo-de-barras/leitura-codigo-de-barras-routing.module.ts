import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeituraCodigoDeBarrasPage } from './leitura-codigo-de-barras.page';

const routes: Routes = [
  {
    path: '',
    component: LeituraCodigoDeBarrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeituraCodigoDeBarrasPageRoutingModule {}
