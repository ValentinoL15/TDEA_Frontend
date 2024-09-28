import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FailurePayPageRoutingModule } from './failure-pay-routing.module';

import { FailurePayPage } from './failure-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FailurePayPageRoutingModule
  ],
  declarations: [FailurePayPage]
})
export class FailurePayPageModule {}
