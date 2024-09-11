import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlineacionesPage } from './alineaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AlineacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlineacionesPageRoutingModule {}
