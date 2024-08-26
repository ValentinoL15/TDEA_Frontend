import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StadiumPage } from './stadium.page';

const routes: Routes = [
  {
    path: '',
    component: StadiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StadiumPageRoutingModule {}
