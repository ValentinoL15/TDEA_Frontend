import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTribunalesPageRoutingModule } from './ver-tribunales-routing.module';

import { VerTribunalesPage } from './ver-tribunales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTribunalesPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [VerTribunalesPage]
})
export class VerTribunalesPageModule {}
