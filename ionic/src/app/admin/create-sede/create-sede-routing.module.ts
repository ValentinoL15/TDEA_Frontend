import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSedePage } from './create-sede.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSedePageRoutingModule {}
