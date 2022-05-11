import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletarPage } from './deletar.page';

const routes: Routes = [
  {
    path: '',
    component: DeletarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletarPageRoutingModule {}
