import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablasPageRoutingModule } from './tablas-routing.module';

import { TablasPage } from './tablas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablasPageRoutingModule
  ],
  declarations: [TablasPage]
})
export class TablasPageModule {}
