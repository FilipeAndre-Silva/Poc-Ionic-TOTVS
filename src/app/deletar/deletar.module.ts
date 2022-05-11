import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletarPageRoutingModule } from './deletar-routing.module';

import { DeletarPage } from './deletar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletarPageRoutingModule
  ],
  declarations: [DeletarPage]
})
export class DeletarPageModule {}
