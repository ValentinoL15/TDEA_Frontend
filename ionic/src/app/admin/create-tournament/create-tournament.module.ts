import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTournamentPageRoutingModule } from './create-tournament-routing.module';

import { CreateTournamentPage } from './create-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTournamentPageRoutingModule
  ],
  declarations: [CreateTournamentPage]
})
export class CreateTournamentPageModule {}
