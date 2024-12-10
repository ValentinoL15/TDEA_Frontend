import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabs3Page } from './tabs3.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabs3PageRoutingModule {}
