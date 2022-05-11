import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeituraCodigoDeBarrasPageRoutingModule } from './leitura-codigo-de-barras-routing.module';

import { LeituraCodigoDeBarrasPage } from './leitura-codigo-de-barras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeituraCodigoDeBarrasPageRoutingModule
  ],
  declarations: [LeituraCodigoDeBarrasPage]
})
export class LeituraCodigoDeBarrasPageModule {}
