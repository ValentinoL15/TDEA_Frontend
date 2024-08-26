import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStadiumPageRoutingModule } from './create-stadium-routing.module';

import { CreateStadiumPage } from './create-stadium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStadiumPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateStadiumPage]
})
export class CreateStadiumPageModule {}
