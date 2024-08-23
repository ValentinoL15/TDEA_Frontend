import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDayPageRoutingModule } from './create-day-routing.module';

import { CreateDayPage } from './create-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDayPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateDayPage]
})
export class CreateDayPageModule {}
