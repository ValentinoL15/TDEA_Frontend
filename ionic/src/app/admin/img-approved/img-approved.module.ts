import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgApprovedPageRoutingModule } from './img-approved-routing.module';

import { ImgApprovedPage } from './img-approved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgApprovedPageRoutingModule
  ],
  declarations: [ImgApprovedPage]
})
export class ImgApprovedPageModule {}
