import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSeasonPage } from './create-season.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSeasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSeasonPageRoutingModule {}
