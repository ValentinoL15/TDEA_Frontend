import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SedeHorariosPage } from './sede-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: SedeHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SedeHorariosPageRoutingModule {}
