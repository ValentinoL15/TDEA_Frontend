import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlayerPageRoutingModule } from './edit-player-routing.module';

import { EditPlayerPage } from './edit-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlayerPageRoutingModule
  ],
  declarations: [EditPlayerPage]
})
export class EditPlayerPageModule {}
