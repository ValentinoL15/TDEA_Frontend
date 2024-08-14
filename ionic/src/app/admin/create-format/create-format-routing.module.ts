import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFormatPage } from './create-format.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFormatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFormatPageRoutingModule {}
