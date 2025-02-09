import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentPageRoutingModule } from './tournament-routing.module';

import { TournamentPage } from './tournament.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [TournamentPage]
})
export class TournamentPageModule {}
