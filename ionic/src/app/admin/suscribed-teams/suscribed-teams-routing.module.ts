import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuscribedTeamsPage } from './suscribed-teams.page';

const routes: Routes = [
  {
    path: '',
    component: SuscribedTeamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuscribedTeamsPageRoutingModule {}
