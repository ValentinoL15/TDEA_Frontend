import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StadiumPageRoutingModule } from './stadium-routing.module';

import { StadiumPage } from './stadium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StadiumPageRoutingModule,
    FormsModule
  ],
  declarations: [StadiumPage]
})
export class StadiumPageModule {}
