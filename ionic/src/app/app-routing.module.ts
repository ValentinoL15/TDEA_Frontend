import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateTournamentPage } from './admin/create-tournament/create-tournament.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  //////////////////////////////////ADMIN///////////////////////////////////////////
  {
    path: 'admin-home',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/tabs2/tabs2.module').then(m => m.Tabs2PageModule)
  },
  {
    path: 'create-category',
    loadChildren: () => import('./admin/create-category/create-category.module').then( m => m.CreateCategoryPageModule)
  },
  {
    path: 'create-format',
    loadChildren: () => import('./admin/create-format/create-format.module').then( m => m.CreateFormatPageModule)
  },
  {
    path: 'create-division',
    loadChildren: () => import('./admin/create-division/create-division.module').then( m => m.CreateDivisionPageModule)
  },
  {
    path: 'format/:id',
    loadChildren: () => import('./admin/format/format.module').then( m => m.FormatPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./admin/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'division/:id',
    loadChildren: () => import('./admin/division/division.module').then( m => m.DivisionPageModule)
  },
  {
    path: 'create-tournament',
    loadChildren: () => import('./admin/create-tournament/create-tournament.module').then( m =>CreateTournamentPage)
  },
  {
    path: 'tournaments/:id',
    loadChildren: () => import('./admin/tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'create-season',
    loadChildren: () => import('./admin/create-season/create-season.module').then( m => m.CreateSeasonPageModule)
  },
  {
    path: 'season/:id',
    loadChildren: () => import('./admin/season/season.module').then( m => m.SeasonPageModule)
  },
  /////////////////////////////////ADMIN/////////////////////////////////////////////
  {
    path: 'create-team',
    loadChildren: () => import('./create-team/create-team.module').then( m => m.CreateTeamPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'confirm-code/:id',
    loadChildren: () => import('./confirm-code/confirm-code.module').then( m => m.ConfirmCodePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
