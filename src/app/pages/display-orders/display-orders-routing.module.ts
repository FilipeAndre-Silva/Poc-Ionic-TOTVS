import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayOrdersPage } from './display-orders.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayOrdersPageRoutingModule {}
