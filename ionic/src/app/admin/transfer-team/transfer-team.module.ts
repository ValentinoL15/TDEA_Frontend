import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferTeamPageRoutingModule } from './transfer-team-routing.module';

import { TransferTeamPage } from './transfer-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferTeamPageRoutingModule
  ],
  declarations: [TransferTeamPage]
})
export class TransferTeamPageModule {}
