import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampeonatoPage } from './campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: CampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampeonatoPageRoutingModule {}
