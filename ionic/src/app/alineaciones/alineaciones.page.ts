import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { List } from '../interfaces/List';
import { Team } from '../interfaces/Team';
import { Player } from '../interfaces/Player';

@Component({
  selector: 'app-alineaciones',
  templateUrl: './alineaciones.page.html',
  styleUrls: ['./alineaciones.page.scss'],
})
export class AlineacionesPage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService,) {
}

list: List = {
  ownerUser: { firstName: "",
    lastName: "",
  },
  ownerTeam: {
    _id: ""
  },
  teamPicture: "",
  shirtColor: "",
  alineacion: 0,
  alternativeShirtColor: "",
  nameList: "",
  players: [{
    _id: "",
    firstName: "",
    lastName: "",
    dni: 0,
    shirtNumber: 0,
    nacimiento: "",
    ownerList: "",
    picturePlayer: ""
}],
}

team: Team = {
  _id: "",
  teamName: "",
  teamNotes: "",
  socialMedia: "",
}

id:any
equipo: any
formatoSeleccionado: any;
players: Player[] = []
suplentes:Player[] = [];
titulares: any

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
  })
  this.getSuplentes()
}

volver(){
  this.router.navigate([`/list/${this.id}`])
}

getSuplentes(){
  this.userService.getSuplentes(this.id).subscribe({
    next: (res : any) => {
      this.suplentes = res.suplentes
      console.log(this.suplentes)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getTitulares(){
  this.userService.getTitulares(this.id).subscribe({
    next: (res : any) => {
      this.titulares = res.titulares
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

}
