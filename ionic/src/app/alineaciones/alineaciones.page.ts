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
  typeAlineacion: 0,
  teamPicture: "",
  shirtColor: "",
  alineacion: {
    _id: "",
  teamList: "",
  arquero: {
    _id: "",
  firstName: "",
  },
  defensor1: {
    _id: "",
    firstName: "",
  },
  defensor2: {
    _id: "",
    firstName: "",
  },
  defensor3: {
    _id: "",
    firstName: "",
  },
  defesnor4: {
    _id: "",
    firstName: "",
  },
  mediocampista1: {
    _id: "",
    firstName: "",
  },
  mediocampista2: {
    _id: "",
    firstName: "",
  },
  mediocampista3: {
    _id: "",
    firstName: "",
  },
  mediocampista4: {
    _id: "",
    firstName: "",
  },
  delantero1: {
    _id: "",
    firstName: "",
  },
  delantero2: {
    _id: "",
    firstName: "",
  },
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
formacion: any
equipo: any
formatoSeleccionado: any;
players: Player[] = []
suplentes:Player[] = [];
titulares: any

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
    this.formacion = params['alineacion']
  })
  this.getSuplentes()
  this.getList(this.id)
}

volver(){
  this.router.navigate([`/list/${this.id}`])
}

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}



getList(id:any){
  this.userService.getList(id).subscribe({
    next: (res : any) => {
      this.list = res.list
      console.log(this.list)
    },
    error: (err: any) => {
      console.error(err);
    }
  })
}

getSuplentes(){
  this.userService.getSuplentes(this.id, this.formacion).subscribe({
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

/**********************ARQUERO-ALINEACION**********************/ 

agregarArquero(form: any){
  const formulario = {
    arquero: form.arquero.value
  }
  this.userService.addArquero(this.formacion,formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
  
}

}
