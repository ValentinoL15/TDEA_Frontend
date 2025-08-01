import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../interfaces/Tournament';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { Team } from '../interfaces/Team';
import { Deuda } from '../interfaces/Deudas';

@Component({
  selector: 'app-success-pay',
  templateUrl: './success-pay.page.html',
  styleUrls: ['./success-pay.page.scss'],
})
export class SuccessPayPage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService, private userService: UserService) { }

teamListId: any;
deudaId: any;
paid: any
deuda: Deuda = {
  _id: "",
  amount: 0,
  paid: 0,
  deudaTotal: 0
};
tournament: any
tournamentId: Tournament = {
  _id: "",
  nameFantasy: "",
  ano: 0,
  teamSubscribed: [{
    _id: "",
    preferences: []
  }],
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
    categoryName : ""
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
    day: {
      type: ""
    },
    sede: {
      images: []
    },
    stadium: {
      _id: "",
    belongToSede: "",
    code: "",
    type: "",
    length: 0,
    width: 0,
    roof: "",
    grass: "",
    punctuaction: "",
    },
    time:[] // Aquí debes definir correctamente el array de strings según el tipo esperado
  }],
  fixture: [{
    _id: "",
    jornada: 0,
    partidos: [{
      team1: {
        _id: '',
    },
    team2: {
        _id: '',
    },
      local: {
          _id: '',
          nameList: ''
      },
      visitante: {
          _id: '',
          nameList: ''
      },
    resultado: {
        
            team1: 0,
            team2: 0
        
    },
     
    }]
  }],
  estadisticasJugadores: [
          {
              jugador: {
                  _id: '',
                  firstName: '',
                  lastName: '',
              },
              equipo: {
                  _id: '',
                  nameList: '',
                  typeAlineacion: 0,
                  teamPicture: ''
              },
              goles: 0,
              amarillas: 0,
              rojas: 0
          }
      ],
  tablaPosiciones: [{
        puntos: 0,
        partidosJugados: 0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0
  }],
  cupos: 0,
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
  defensor4: {
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
  delantero1: {
    _id: "",
    firstName: "",
  },
  delantero2: {
    _id: "",
    firstName: "",
  },
  delantero3: {
    _id: "",
    firstName: "",
  },
  },
  alternativeShirtColor: "",
  nameList: "",
}



currentYear = new Date().getFullYear();

ngOnInit() {
  // Obtener los parámetros de la URL
  this.route.queryParams.subscribe(params => {
    this.tournamentId = params['tournamentId'];
    this.teamListId = params['teamListId'];
    this.deudaId = params['deudaId'];
    this.paid = params['paid']

    // Llamar al servicio para procesar la inscripción
    if (this.tournamentId && this.teamListId && this.deudaId && this.paid) {
      this.userService.procesarInscripcion(this.tournamentId, this.deudaId, this.teamListId, this.paid).subscribe({
        next: (res : any) => {
          console.log('Respuesta de inscripción:', res);
          this.tournament = res.tournament
          console.log(this.tournament)
          // Maneja la respuesta aquí, tal vez redirigir o mostrar un mensaje
        },
        error: (err) => {
          console.error('Error al procesar la inscripción:', err);
          // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
        }
      });
    }
  });
  this.getDeuda()
  this.getTournament()
}


getList(id : any){
  this.userService.getList(id).subscribe({
    next: (res: any) => {
      this.list = res.list
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getTournament(){
  this.tournamentServ.getTournament(this.tournamentId).subscribe({
    next: (res: any) => {
      this.tournament = res.tournamentFound
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getDeuda(){
  this.userService.getDeudas(this.deudaId).subscribe({
    next: (res: any) => {
      this.deudaId = res.deudas
      console.log("Esta deuda:" + this.deuda)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}


volver(){
  window.location.href = `/user/home`
}

}
