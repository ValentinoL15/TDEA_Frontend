import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSeasonPageRoutingModule } from './create-season-routing.module';

import { CreateSeasonPage } from './create-season.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSeasonPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateSeasonPage]
})
export class CreateSeasonPageModule {}
