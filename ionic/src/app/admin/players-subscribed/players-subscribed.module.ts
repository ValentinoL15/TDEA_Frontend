import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersSubscribedPageRoutingModule } from './players-subscribed-routing.module';

import { PlayersSubscribedPage } from './players-subscribed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersSubscribedPageRoutingModule
  ],
  declarations: [PlayersSubscribedPage]
})
export class PlayersSubscribedPageModule {}
