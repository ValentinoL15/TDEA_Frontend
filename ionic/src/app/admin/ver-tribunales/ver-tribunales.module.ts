import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTribunalesPageRoutingModule } from './ver-tribunales-routing.module';

import { VerTribunalesPage } from './ver-tribunales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTribunalesPageRoutingModule
  ],
  declarations: [VerTribunalesPage]
})
export class VerTribunalesPageModule {}
