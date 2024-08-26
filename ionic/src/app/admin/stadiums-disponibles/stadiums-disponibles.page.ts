import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stadium } from 'src/app/interfaces/Stadium';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-stadiums-disponibles',
  templateUrl: './stadiums-disponibles.page.html',
  styleUrls: ['./stadiums-disponibles.page.scss'],
})
export class StadiumsDisponiblesPage implements OnInit {

  id:any
  stadiums: Stadium[] = []
  tournament: Tournament = {
    nameFantasy: "",
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
    isTournamentActive: false
  }

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(parmas => {
      this.id = parmas['id']
      this.getTournament(this.id)
    }) 
    this.getStadiums()
  }

  volver(){
    this.router.navigate([`/tournaments/${this.id}`])
  }

  getStadiums(){
    this.tournamentServ.getEstadios().subscribe({
      next: (res : any) => {
        this.stadiums = res.stadiums
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getTournament(id:any){
    this.tournamentServ.getTournament(id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }



}
