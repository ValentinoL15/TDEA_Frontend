import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabs2Page } from './tabs2.page';
import { HomeTournamentPage } from '../home-tournament/home-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs2Page,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'admin-home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home-tournament',
        loadChildren: () => import('../home-tournament/home-tournament.module').then( m => m.HomeTournamentPageModule)
      },
      {
        path: 'informes',
        loadChildren: () => import('../informes/informes.module').then( m => m.InformesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabs2PageRoutingModule {}
