import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayOrdersFinalizedPageRoutingModule } from './display-orders-finalized-routing.module';

import { DisplayOrdersFinalizedPage } from './display-orders-finalized.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayOrdersFinalizedPageRoutingModule,
    SwiperModule
  ],
  declarations: [DisplayOrdersFinalizedPage]
})
export class DisplayOrdersFinalizedPageModule {}
