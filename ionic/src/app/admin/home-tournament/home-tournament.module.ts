import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTournamentPageRoutingModule } from './home-tournament-routing.module';

import { HomeTournamentPage } from './home-tournament.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {  GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTournamentPageRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    GoogleMapsModule,
  ],
  declarations: [HomeTournamentPage]
})
export class HomeTournamentPageModule {}
