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
    path: 'day/:id/:dayId',
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
  {
    path: 'informes',
    loadChildren: () => import('./admin/informes/informes.module').then( m => m.InformesPageModule)
  },
  {
    path: 'informes-info/:id',
    loadChildren: () => import('./admin/informes-info/informes-info.module').then( m => m.InformesInfoPageModule)
  },
  {
    path: 'my-users',
    loadChildren: () => import('./admin/my-users/my-users.module').then( m => m.MyUsersPageModule)
  },
  {
    path: 'admin-users/:id',
    loadChildren: () => import('./admin/admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'sede-horarios/:id',
    loadChildren: () => import('./admin/sede-horarios/sede-horarios.module').then( m => m.SedeHorariosPageModule)
  },
  {
    path: 'img-approved',
    loadChildren: () => import('./admin/img-approved/img-approved.module').then( m => m.ImgApprovedPageModule)
  },
  {
    path: 'formats-images/:id',
    loadChildren: () => import('./admin/formats-images/formats-images.module').then( m => m.FormatsImagesPageModule)
  },
  {
    path: 'informes-preferences/:id/:dayId/:dayIndex',
    loadChildren: () => import('./admin/informes-preferences/informes-preferences.module').then( m => m.InformesPreferencesPageModule)
  },
  {
    path: 'transfer-team',
    loadChildren: () => import('./admin/transfer-team/transfer-team.module').then( m => m.TransferTeamPageModule)
  },
   {
    path: 'tribunales/:id/:player_id',
    loadChildren: () => import('./admin/tribunales/tribunales.module').then( m => m.TribunalesPageModule)
  },
/////////////////////////////////////////////ADMIN///////////////////////////////////////////////////
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
    path: 'list/:id',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create-list/:id',
    loadChildren: () => import('./create-list/create-list.module').then( m => m.CreateListPageModule)
  },
  {
    path: 'players',
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
    path: 'eliminatoria/:id',
    loadChildren: () => import('./eliminatoria/inscripcion.module').then( m => m.InscripcionPageModule)
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
    path: 'inscripciones',
    loadChildren: () => import('./inscripciones/inscripciones.module').then( m => m.InscripcionesPageModule)
  },
  {
    path: 'alineaciones/:id/:alineacion',
    loadChildren: () => import('./alineaciones/alineaciones.module').then( m => m.AlineacionesPageModule)
  },
  {
    path: 'add-players/:id',
    loadChildren: () => import('./add-players/add-players.module').then( m => m.AddPlayersPageModule)
  },
  {
    path: 'add-players-list',
    loadChildren: () => import('./add-players-list/add-players-list.module').then( m => m.AddPlayersListPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success-pay/success-pay.module').then( m => m.SuccessPayPageModule)
  },
  {
    path: 'failure',
    loadChildren: () => import('./failure-pay/failure-pay.module').then( m => m.FailurePayPageModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./pending-pay/pending-pay.module').then( m => m.PendingPayPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset/:id',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'deudas',
    loadChildren: () => import('./deudas/deudas.module').then( m => m.DeudasPageModule)
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
  },
  {
    path: 'inscripcion',
    loadChildren: () => import('./inscripcion/inscripcion.module').then( m => m.InscripcionPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
