import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/interfaces/Player';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-players-subscribed',
  templateUrl: './players-subscribed.page.html',
  styleUrls: ['./players-subscribed.page.scss'],
})
export class PlayersSubscribedPage implements OnInit {

  constructor(private route : ActivatedRoute, private notifyService: NotifyService, private router: Router, private tournamentService: TournamentService, private userService: UserService) { }

  id:any
  players: Player[] = []
  player: Player = {
    _id: "",
    firstName: "",
    lastName: "",
    dni: 0,
    shirtNumber: 0,
    nacimiento: "",
    ownerList: "",
    picturePlayer: ""
  }
  tournamentSubscribed: any; // ID del torneo

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.tournamentSubscribed = params['tournamentSubscribed']; // ID del torneo
    })
    this.obtenerPlayers()
  }

  obtenerPlayers(){
    this.userService.getPlayerLista(this.tournamentSubscribed,this.id).subscribe({
      next: (res : any) => {
        this.players = res.player 
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  volver(){
    this.router.navigate([`admin/suscribed-teams/${this.tournamentSubscribed}`])
  }



}
