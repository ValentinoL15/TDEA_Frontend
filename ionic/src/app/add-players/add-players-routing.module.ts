import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlayersPage } from './add-players.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlayersPageRoutingModule {}
