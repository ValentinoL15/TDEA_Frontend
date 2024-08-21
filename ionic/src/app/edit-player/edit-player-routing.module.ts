import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPlayerPage } from './edit-player.page';

const routes: Routes = [
  {
    path: '',
    component: EditPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPlayerPageRoutingModule {}
