import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessPayPage } from './success-pay.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessPayPageRoutingModule {}
