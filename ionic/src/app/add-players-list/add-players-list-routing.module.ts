import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlayersListPage } from './add-players-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlayersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlayersListPageRoutingModule {}
