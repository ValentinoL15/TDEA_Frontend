import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TribunalesPage } from './tribunales.page';

const routes: Routes = [
  {
    path: '',
    component: TribunalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TribunalesPageRoutingModule {}
