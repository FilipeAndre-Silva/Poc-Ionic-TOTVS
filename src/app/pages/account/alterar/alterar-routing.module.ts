import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarPage } from './alterar.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarPageRoutingModule {}
