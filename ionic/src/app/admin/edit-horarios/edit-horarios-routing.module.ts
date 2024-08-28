import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHorariosPage } from './edit-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: EditHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHorariosPageRoutingModule {}
