import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSedePageRoutingModule } from './create-sede-routing.module';

import { CreateSedePage } from './create-sede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSedePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateSedePage]
})
export class CreateSedePageModule {}
