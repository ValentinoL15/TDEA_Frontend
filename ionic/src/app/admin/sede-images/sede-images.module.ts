import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SedeImagesPageRoutingModule } from './sede-images-routing.module';

import { SedeImagesPage } from './sede-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SedeImagesPageRoutingModule
  ],
  declarations: [SedeImagesPage]
})
export class SedeImagesPageModule {}
