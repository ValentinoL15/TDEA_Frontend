import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCategoryPageRoutingModule } from './create-category-routing.module';

import { CreateCategoryPage } from './create-category.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Tabs2PageModule } from '../tabs2/tabs2.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCategoryPageRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  declarations: [CreateCategoryPage]
})
export class CreateCategoryPageModule {}
