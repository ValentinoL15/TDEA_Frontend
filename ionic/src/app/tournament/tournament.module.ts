import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentPageRoutingModule } from './tournament-routing.module';

import { TournamentPage } from './tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TournamentPage]
})
export class TournamentPageModule {}
