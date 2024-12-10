import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJugadorPageRoutingModule } from './home-jugador-routing.module';

import { HomeJugadorPage } from './home-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJugadorPageRoutingModule
  ],
  declarations: [HomeJugadorPage]
})
export class HomeJugadorPageModule {}
