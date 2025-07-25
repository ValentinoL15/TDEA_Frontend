import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablasPage } from './tablas.page';

const routes: Routes = [
  {
    path: '',
    component: TablasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablasPageRoutingModule {}
