import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingPayPageRoutingModule } from './pending-pay-routing.module';

import { PendingPayPage } from './pending-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingPayPageRoutingModule
  ],
  declarations: [PendingPayPage]
})
export class PendingPayPageModule {}
