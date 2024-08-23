import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTournamentPageRoutingModule } from './home-tournament-routing.module';

import { HomeTournamentPage } from './home-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTournamentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeTournamentPage]
})
export class HomeTournamentPageModule {}
