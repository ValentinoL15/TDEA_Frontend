import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgApprovedPage } from './img-approved.page';

const routes: Routes = [
  {
    path: '',
    component: ImgApprovedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgApprovedPageRoutingModule {}
