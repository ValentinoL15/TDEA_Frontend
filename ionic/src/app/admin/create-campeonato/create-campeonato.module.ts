import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampeonatoPageRoutingModule } from './create-campeonato-routing.module';

import { CreateCampeonatoPage } from './create-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCampeonatoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCampeonatoPage]
})
export class CreateCampeonatoPageModule {}
