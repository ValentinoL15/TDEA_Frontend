import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'iniciar',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'torneos',
        loadChildren: () => import('../tournaments/tournaments.module').then( m => m.TournamentsPageModule)
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('../inscripciones/inscripciones.module').then( m => m.InscripcionesPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then( m => m.PlayersPageModule)
      },
      {
        path: 'create-list',
        loadChildren: () => import('../create-list/create-list.module').then( m => m.CreateListPageModule)
      },
      {
        path: 'deudas',
        loadChildren: () => import('../deudas/deudas.module').then( m => m.DeudasPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
