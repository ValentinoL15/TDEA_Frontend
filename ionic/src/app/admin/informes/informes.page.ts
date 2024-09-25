import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

tournaments: Tournament[] = []

constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router) { }

ngOnInit() {
  this.getTournaments()
}

getTournaments(){
  this.tournamentServ.getTournaments().subscribe({
    next: (res : any) => {
      this.tournaments = res.tournaments
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getDays(tournament: Tournament): string {
  return tournament.daysTournament?.map(day => day.day).join(', ') || '';
}

getTeamsSubscribed(tournament: Tournament): number {
  return tournament.teamSubscribed?.length || 0
}


goTournament(id:any){
  this.router.navigate([`/informes-info/${id}`])
}
}
