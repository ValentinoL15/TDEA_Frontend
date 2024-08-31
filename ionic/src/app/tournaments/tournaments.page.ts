import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { AlertController } from '@ionic/angular';
import { List } from '../interfaces/List';
import { Tournament } from '../interfaces/Tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

constructor(private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService, private alertController: AlertController) { }

id:any
torneos: Tournament[] = []


ngOnInit() {
  this.getTournaments()
}

volver(){
  this.router.navigate([`/user/home`])
}

goTournament(id : any){
  this.router.navigate([`/tournament/${id}`])
}


getTournaments(){
  this.tournamentServ.getTournaments().subscribe({
    next: (res : any) => {
      this.torneos = res.tournaments
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

}
