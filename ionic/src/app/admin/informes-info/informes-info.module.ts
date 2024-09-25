import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesInfoPageRoutingModule } from './informes-info-routing.module';

import { InformesInfoPage } from './informes-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformesInfoPageRoutingModule
  ],
  declarations: [InformesInfoPage]
})
export class InformesInfoPageModule {}
