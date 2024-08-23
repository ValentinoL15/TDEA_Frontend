import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTournamentPage } from './home-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTournamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTournamentPageRoutingModule {}
