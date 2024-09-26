import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../interfaces/Tournament';

@Component({
  selector: 'app-success-pay',
  templateUrl: './success-pay.page.html',
  styleUrls: ['./success-pay.page.scss'],
})
export class SuccessPayPage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService) { }

teamListId: any;
tournamentId: any
tournament: Tournament = {
  nameFantasy: "",
  ano: 0,
  campeonato: {
    type: ""
  },
  edad: {
    type: ""
  },
  rangeAgeSince: 0,
  rangeAgeUntil: 0,
  ageDescripcion: "",
  category: {
    _id: "",
    categoryName : "",
    ageLimiter : 0
  },
  format: {
    _id:"",
  formatName: "",
  minPlayers: 0,
  maxPlayers: 0
  },
  tournamentDate: new Date(),
  tournamentNotes: "",
  isTournamentMasculine: false,
  isTournamentActive: false,
  tarifaInscripcion: 0,
  tarifaPartido: 0,
  daysTournament: [{
    _id:"",
  creator: "",
  belongTournament: "",
  day: "",
  sede: [{
    _id: "",
  creator: "",
  belongDay: "",
  stadium: {
      _id: "",
      belongToSede: "",
      code: "",
      type: 0,
      length: 0,
      width: 0,
      roof: "",
      grass: "",
      punctuaction: 0,
  },
  times: []
  }]
  }],
  cupos: 0
}
currentYear = new Date().getFullYear();

ngOnInit() {
  this.route.params.subscribe(params => {
  this.tournamentId = params['tournamentId']
})
  this.getTournament()
}

getTournament(){
  this.tournamentServ.getTournament(this.tournamentId).subscribe({
    next: (res : any) => {
      this.tournament = res.tournament
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message);
    }
  })
}

volver(){
  window.location.href = `/user/home`
}

}
