import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStadiumPage } from './create-stadium.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStadiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStadiumPageRoutingModule {}
