import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFormatPageRoutingModule } from './create-format-routing.module';

import { CreateFormatPage } from './create-format.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFormatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateFormatPage]
})
export class CreateFormatPageModule {}
