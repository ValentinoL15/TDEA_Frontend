import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCampeonatoPage } from './create-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCampeonatoPageRoutingModule {}
