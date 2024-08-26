import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StadiumsDisponiblesPage } from './stadiums-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: StadiumsDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StadiumsDisponiblesPageRoutingModule {}
