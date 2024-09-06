import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEdadPage } from './create-edad.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEdadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEdadPageRoutingModule {}
