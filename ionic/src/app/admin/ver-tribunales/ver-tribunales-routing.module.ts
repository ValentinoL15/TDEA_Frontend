import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTribunalesPage } from './ver-tribunales.page';

const routes: Routes = [
  {
    path: '',
    component: VerTribunalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTribunalesPageRoutingModule {}
