import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { AlertController } from '@ionic/angular';
import { List } from '../interfaces/List';
import { Team } from '../interfaces/Team';
import { Player } from '../interfaces/Player';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.page.html',
  styleUrls: ['./add-players.page.scss'],
})
export class AddPlayersPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService, private alertController: AlertController) { }

id:any 
list: List = {
  ownerUser: { firstName: "", lastName: "" },
  ownerTeam: { _id: "" },
  typeAlineacion: 0,
  teamPicture: "",
  shirtColor: "",
  alineacion: {
    arquero: { _id: "", firstName: "" },
    defensor1: { _id: "", firstName: "" },
    defensor2: { _id: "", firstName: "" },
    defensor3: { _id: "", firstName: "" },
    mediocampista1: { _id: "", firstName: "" },
    mediocampista2: { _id: "", firstName: "" },
    mediocampista3: { _id: "", firstName: "" },
    delantero1: { _id: "", firstName: "" },
    delantero2: { _id: "", firstName: "" },
    delantero3: {_id: "",firstName: "",},
  },
  alternativeShirtColor: "",
  nameList: "",
  players: [{
    _id: "",
    firstName: "",
    lastName: "",
    dni: 0,
    shirtNumber: 0,
    nacimiento: "",
    
    picturePlayer: ""
  }],
  suplente: [{
    _id: "",
    firstName: ""
  }],
  titular: [{
    _id: "",
    firstName: ""
  }]
}

team: Team = {
  _id: "",
  teamName: "",
  teamNotes: "",
  socialMedia: "",
  teamImage:"",
  players: [{
    _id: "",
    firstName: "",
  }],
  active: false
}

player: Player = {
  _id: "",
  firstName: "",
  lastName: "",
  dni: 0,
}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
  })
  this.getList(this.id)
  this.getTeam()
}

volver(){
  window.location.href = `/alineaciones/${this.id}/${this.list.alineacion?._id}`
}

getList(id : any){
  this.userService.getList(id).subscribe({
    next: (res : any) => {
      this.list = res.list
      console.log(this.list)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getTeam(){
  this.userService.getTeamActive().subscribe({
    next: (res : any) => {
      this.team = res.team
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

isTitular(playerId: any): boolean {
  return this.list?.titular?.some((titularPlayer: any) => titularPlayer._id === playerId) || false;
}

isSuplente(playerId: any): boolean {
  return this.list?.suplente?.some((suplentePlayer: any) => suplentePlayer._id === playerId) || false;
}

getCamisetaImage(playerId: any): string {
  if (this.isTitular(playerId)) {
    return '../../assets/icon/remera-titulares.svg';  // Imagen para titulares
  } else if (this.isSuplente(playerId)) {
    return '../../assets/icon/remera-titulares.svg';  // Imagen para suplentes
  } else {
    return '../../assets/icon/shirt-solid (1).svg';  // Imagen para jugadores no listados
  }
}

async selectedPlayer(player : any) {
  const alert = await this.alertController.create({
    header: 'Confirmar Suplente',
    message: `¿Estás seguro de que quieres agregar a ${player.firstName + " " + player.lastName} a esta lista?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // El usuario ha cancelado, no hacer nada
        }
      },
      {
        text: 'Agregar',
        handler: () => {
          // El usuario ha confirmado, proceder con la eliminación
          if (!player._id) {
            this.notifyService.error('ID del jugador no disponible');
            return;
        }
            this.userService.addPlayerList(this.id, player._id).subscribe({
              next: (res : any) => {
                this.notifyService.success(res.message)
                this.getList(this.id)
              },
              error: (err: any) => {
                this.notifyService.error(err.error.message)
              }
            })
        }
      }
    ]
  });

  await alert.present();
}



}
