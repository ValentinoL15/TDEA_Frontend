import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferTeamPage } from './transfer-team.page';

const routes: Routes = [
  {
    path: '',
    component: TransferTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferTeamPageRoutingModule {}
