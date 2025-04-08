import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminatoriaPageRoutingModule } from './eliminatoria-routing.module';

import { EliminatoriaPage } from './eliminatoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminatoriaPageRoutingModule
  ],
  declarations: [EliminatoriaPage]
})
export class EliminatoriaPageModule {}
