import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayOrdersFinalizedPage } from './display-orders-finalized.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayOrdersFinalizedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayOrdersFinalizedPageRoutingModule {}
