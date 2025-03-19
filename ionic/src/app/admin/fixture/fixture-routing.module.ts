import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixturePage } from './fixture.page';

const routes: Routes = [
  {
    path: '',
    component: FixturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixturePageRoutingModule {}
