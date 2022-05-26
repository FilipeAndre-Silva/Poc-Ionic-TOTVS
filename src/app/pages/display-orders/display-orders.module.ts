import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayOrdersPageRoutingModule } from './display-orders-routing.module';

import { DisplayOrdersPage } from './display-orders.page';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayOrdersPageRoutingModule,
    SwiperModule
  ],
  declarations: [DisplayOrdersPage]
})
export class DisplayOrdersPageModule {}
