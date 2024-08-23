import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDayPage } from './create-day.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDayPageRoutingModule {}
