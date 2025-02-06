import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormatsImagesPageRoutingModule } from './formats-images-routing.module';

import { FormatsImagesPage } from './formats-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormatsImagesPageRoutingModule
  ],
  declarations: [FormatsImagesPage]
})
export class FormatsImagesPageModule {}
