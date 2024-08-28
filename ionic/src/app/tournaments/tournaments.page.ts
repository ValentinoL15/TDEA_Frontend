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

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService, private alertController: AlertController) { }

id:any
torneos: Tournament[] = []
list: List = {
  _id: "",
  ownerUser: {
      _id: "",
      firstName: "",
      lastName: ""
  },
  ownerTeam: {
      _id: "",
  },
  shirtColor: "",
  alternativeShirtColor: "",
  belongToTournament: "",
  players: [],
  teamListNotes: "",
  isTeamListActive: false,
  teamListStatus: "",
  division: { 
      _id: "",
      order:0
  },
  nameList: ""
}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
  })
  this.getList(this.id)
  this.getTournaments()
}



volver(){
  this.router.navigate([`/list/${this.id}`])
}

getList(id:any){
  this.userService.getList(id).subscribe({
    next: (res : any) => {
      this.list = res.list
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
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
