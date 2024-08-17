import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDivisionPageRoutingModule } from './create-division-routing.module';

import { CreateDivisionPage } from './create-division.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDivisionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateDivisionPage]
})
export class CreateDivisionPageModule {}
