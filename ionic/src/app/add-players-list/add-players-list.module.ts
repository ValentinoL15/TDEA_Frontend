import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlayersListPageRoutingModule } from './add-players-list-routing.module';

import { AddPlayersListPage } from './add-players-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlayersListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPlayersListPage]
})
export class AddPlayersListPageModule {}
