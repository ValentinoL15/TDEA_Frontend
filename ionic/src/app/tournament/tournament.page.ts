import { Component, OnInit } from '@angular/core';
import { Tournament } from '../interfaces/Tournament';
import { TournamentService } from '../services/tournament.service';
import { NotifyService } from '../services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Day } from '../interfaces/Day';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {

  days: Day[] = []

  tournament: Tournament = {
    nameFantasy: "",
    ano: 0,
    campeonato: {
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
    }]
  }
  currentYear = new Date().getFullYear();
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

  id:any

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getTournament(this.id)
    })
    this.getDays(this.id)
    
  }

  volver(){
    this.router.navigate(['/user/torneos']);
  }

  getTournament(id:any){
    this.tournamentServ.getTournament(id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound
        this.tournament.tournamentDate = this.adjustDate(new Date(this.tournament.tournamentDate));
        console.log(this.tournament)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getDays(id : any){
    this.tournamentServ.getDays(id).subscribe({
      next: (res : any) => {
        this.days = res.days
        console.log(this.days)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  adjustDate(date: Date): Date {
    // Ajuste para compensar el desfase de la zona horaria
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + offset * 60000);
    return adjustedDate;
  }

}
