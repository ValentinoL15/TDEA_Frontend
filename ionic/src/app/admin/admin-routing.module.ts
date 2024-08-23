import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs2',
    loadChildren: () => import('./tabs2/tabs2.module').then( m => m.Tabs2PageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-category',
    loadChildren: () => import('./create-category/create-category.module').then( m => m.CreateCategoryPageModule)
  },
  {
    path: 'create-format',
    loadChildren: () => import('./create-format/create-format.module').then( m => m.CreateFormatPageModule)
  },
  {
    path: 'format',
    loadChildren: () => import('./format/format.module').then( m => m.FormatPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'tournaments/:id',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'create-division',
    loadChildren: () => import('./create-division/create-division.module').then( m => m.CreateDivisionPageModule)
  },
  {
    path: 'division',
    loadChildren: () => import('./division/division.module').then( m => m.DivisionPageModule)
  },
  {
    path: 'create-season',
    loadChildren: () => import('./create-season/create-season.module').then( m => m.CreateSeasonPageModule)
  },
  {
    path: 'season',
    loadChildren: () => import('./season/season.module').then( m => m.SeasonPageModule)
  },
  {
    path: 'home-tournament',
    loadChildren: () => import('./home-tournament/home-tournament.module').then( m => m.HomeTournamentPageModule)
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
