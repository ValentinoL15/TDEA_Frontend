import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StadiumsDisponiblesPageRoutingModule } from './stadiums-disponibles-routing.module';

import { StadiumsDisponiblesPage } from './stadiums-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StadiumsDisponiblesPageRoutingModule
  ],
  declarations: [StadiumsDisponiblesPage]
})
export class StadiumsDisponiblesPageModule {}
