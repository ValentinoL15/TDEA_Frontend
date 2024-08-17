import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDivisionPage } from './create-division.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDivisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDivisionPageRoutingModule {}
