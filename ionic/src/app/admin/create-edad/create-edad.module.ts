import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEdadPageRoutingModule } from './create-edad-routing.module';

import { CreateEdadPage } from './create-edad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEdadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateEdadPage]
})
export class CreateEdadPageModule {}
