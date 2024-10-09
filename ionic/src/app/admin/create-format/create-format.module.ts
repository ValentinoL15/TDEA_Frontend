import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFormatPageRoutingModule } from './create-format-routing.module';

import { CreateFormatPage } from './create-format.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFormatPageRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  declarations: [CreateFormatPage]
})
export class CreateFormatPageModule {}
