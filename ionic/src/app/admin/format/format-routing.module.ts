import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormatPage } from './format.page';

const routes: Routes = [
  {
    path: '',
    component: FormatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormatPageRoutingModule {}
