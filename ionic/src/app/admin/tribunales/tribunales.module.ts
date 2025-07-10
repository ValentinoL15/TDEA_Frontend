import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TribunalesPageRoutingModule } from './tribunales-routing.module';

import { TribunalesPage } from './tribunales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TribunalesPageRoutingModule
  ],
  declarations: [TribunalesPage]
})
export class TribunalesPageModule {}
