import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlineacionesPageRoutingModule } from './alineaciones-routing.module';

import { AlineacionesPage } from './alineaciones.page';

import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlineacionesPageRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  declarations: [AlineacionesPage]
})
export class AlineacionesPageModule {}
