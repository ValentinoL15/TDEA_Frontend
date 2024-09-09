import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscribedTeamsPageRoutingModule } from './suscribed-teams-routing.module';

import { SuscribedTeamsPage } from './suscribed-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscribedTeamsPageRoutingModule
  ],
  declarations: [SuscribedTeamsPage]
})
export class SuscribedTeamsPageModule {}
