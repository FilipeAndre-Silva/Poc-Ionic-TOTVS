import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExibirUsuarioPageRoutingModule } from './exibir-usuario-routing.module';

import { ExibirUsuarioPage } from './exibir-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExibirUsuarioPageRoutingModule
  ],
  declarations: [ExibirUsuarioPage]
})
export class ExibirUsuarioPageModule {}
