import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingPayPage } from './pending-pay.page';

const routes: Routes = [
  {
    path: '',
    component: PendingPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingPayPageRoutingModule {}
