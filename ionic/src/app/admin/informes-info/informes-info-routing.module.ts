import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformesInfoPage } from './informes-info.page';

const routes: Routes = [
  {
    path: '',
    component: InformesInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformesInfoPageRoutingModule {}
