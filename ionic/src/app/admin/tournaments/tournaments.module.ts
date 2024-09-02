import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsPageRoutingModule } from './tournaments-routing.module';

import { TournamentsPage } from './tournaments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TournamentsPage]
})
export class TournamentsPageModule {}
