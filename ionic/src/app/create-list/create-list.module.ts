import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateListPageRoutingModule } from './create-list-routing.module';

import { CreateListPage } from './create-list.page';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateListPageRoutingModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  declarations: [CreateListPage]
})
export class CreateListPageModule {}
