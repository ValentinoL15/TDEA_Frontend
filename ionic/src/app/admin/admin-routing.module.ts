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
    path: 'home-tournament',
    loadChildren: () => import('./home-tournament/home-tournament.module').then( m => m.HomeTournamentPageModule)
  },
  {
    path: 'create-day/:id',
    loadChildren: () => import('./create-day/create-day.module').then( m => m.CreateDayPageModule)
  },
  {
    path: 'day/:id',
    loadChildren: () => import('./day/day.module').then( m => m.DayPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'edit-empresa/:id',
    loadChildren: () => import('./edit-empresa/edit-empresa.module').then( m => m.EditEmpresaPageModule)
  },
  {
    path: 'create-sede/:id',
    loadChildren: () => import('./create-sede/create-sede.module').then( m => m.CreateSedePageModule)
  },
  {
    path: 'sede/:id',
    loadChildren: () => import('./sede/sede.module').then( m => m.SedePageModule)
  },
  {
    path: 'create-stadium/:id',
    loadChildren: () => import('./create-stadium/create-stadium.module').then( m => m.CreateStadiumPageModule)
  },
  {
    path: 'stadium/:id',
    loadChildren: () => import('./stadium/stadium.module').then( m => m.StadiumPageModule)
  },
  {
    path: 'edit-horarios/:id',
    loadChildren: () => import('./edit-horarios/edit-horarios.module').then( m => m.EditHorariosPageModule)
  }










];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
