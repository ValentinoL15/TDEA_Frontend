import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormatPageRoutingModule } from './format-routing.module';

import { FormatPage } from './format.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormatPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [FormatPage]
})
export class FormatPageModule {}
