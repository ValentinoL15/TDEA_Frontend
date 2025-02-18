import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformesPreferencesPage } from './informes-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: InformesPreferencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformesPreferencesPageRoutingModule {}
