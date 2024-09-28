import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FailurePayPage } from './failure-pay.page';

const routes: Routes = [
  {
    path: '',
    component: FailurePayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FailurePayPageRoutingModule {}
