import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlineacionesPageRoutingModule } from './alineaciones-routing.module';

import { AlineacionesPage } from './alineaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlineacionesPageRoutingModule
  ],
  declarations: [AlineacionesPage]
})
export class AlineacionesPageModule {}
