import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessPayPageRoutingModule } from './success-pay-routing.module';

import { SuccessPayPage } from './success-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPayPageRoutingModule
  ],
  declarations: [SuccessPayPage]
})
export class SuccessPayPageModule {}
