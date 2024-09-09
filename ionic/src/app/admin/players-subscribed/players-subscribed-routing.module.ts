import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersSubscribedPage } from './players-subscribed.page';

const routes: Routes = [
  {
    path: '',
    component: PlayersSubscribedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersSubscribedPageRoutingModule {}
