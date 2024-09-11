import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeTournamentPage } from './admin/home-tournament/home-tournament.page';


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
    path: 'format/:id',
    loadChildren: () => import('./admin/format/format.module').then( m => m.FormatPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./admin/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'home-tournament',
    loadChildren: () => import('./admin/home-tournament/home-tournament.module').then( m =>HomeTournamentPage)
  },
  {
    path: 'tournaments/:id',
    loadChildren: () => import('./admin/tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'create-day/:id',
    loadChildren: () => import('./admin/create-day/create-day.module').then( m => m.CreateDayPageModule)
  },
  {
    path: 'day/:id',
    loadChildren: () => import('./admin/day/day.module').then( m => m.DayPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./admin/empresa/empresa.module').then(m => m.EmpresaPageModule)
  },
  {
    path: 'edit-empresa/:id',
    loadChildren: () => import('./admin/edit-empresa/edit-empresa.module').then( m => m.EditEmpresaPageModule)
  },
  {
    path: 'create-sede/:id',
    loadChildren: () => import('./admin/create-sede/create-sede.module').then( m => m.CreateSedePageModule)
  },
  {
    path: 'sede/:id',
    loadChildren: () => import('./admin/sede/sede.module').then( m => m.SedePageModule)
  },
  {
    path: 'create-stadium/:id',
    loadChildren: () => import('./admin/create-stadium/create-stadium.module').then( m => m.CreateStadiumPageModule)
  },
  {
    path: 'stadium/:id',
    loadChildren: () => import('./admin/stadium/stadium.module').then( m => m.StadiumPageModule)
  },
  {
    path: 'edit-horarios/:id',
    loadChildren: () => import('./admin/edit-horarios/edit-horarios.module').then( m => m.EditHorariosPageModule)
  },
  {
    path: 'campeonato/:id',
    loadChildren: () => import('./admin/campeonato/campeonato.module').then( m => m.CampeonatoPageModule)
  },
  {
    path: 'create-campeonato',
    loadChildren: () => import('./admin/create-campeonato/create-campeonato.module').then( m => m.CreateCampeonatoPageModule)
  },
  {
    path: 'create-edad',
    loadChildren: () => import('./admin/create-edad/create-edad.module').then( m => m.CreateEdadPageModule)
  },
  {
    path: 'edad/:id',
    loadChildren: () => import('./admin/edad/edad.module').then( m => m.EdadPageModule)
  },
  {
    path: 'suscribed-teams/:id',
    loadChildren: () => import('./admin/suscribed-teams/suscribed-teams.module').then( m => m.SuscribedTeamsPageModule)
  },
  {
    path: 'players-subscribed/:tournamentSubscribed/:id',
    loadChildren: () => import('./admin/players-subscribed/players-subscribed.module').then( m => m.PlayersSubscribedPageModule)
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
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create-list/:id',
    loadChildren: () => import('./create-list/create-list.module').then( m => m.CreateListPageModule)
  },
  {
    path: 'players/:id',
    loadChildren: () => import('./players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'edit-player/:id',
    loadChildren: () => import('./edit-player/edit-player.module').then( m => m.EditPlayerPageModule)
  },
  {
    path: 'torneos',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'inscripcion',
    loadChildren: () => import('./inscripcion/inscripcion.module').then( m => m.InscripcionPageModule)
  },
  {
    path: 'tournament/:id',
    loadChildren: () => import('./tournament/tournament.module').then( m => m.TournamentPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'inscripciones/:id',
    loadChildren: () => import('./inscripciones/inscripciones.module').then( m => m.InscripcionesPageModule)
  },
  {
    path: 'alineaciones/:id',
    loadChildren: () => import('./alineaciones/alineaciones.module').then( m => m.AlineacionesPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
