import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { List } from '../interfaces/List';
import { Player } from '../interfaces/Player';
import { Tournament } from '../interfaces/Tournament';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService) { }

id:any
list: List = {
  nameList: "",
  typeAlineacion: 0,
  teamPicture: "",
  tournamentRegistration: {
    nameFantasy: "",
  ano: 0,
  order: 0,
  campeonato:{
    _id: "",
    type: ""
  },
  edad: {
    _id: "",
    type: ""
  },
  daysTournament: [{
    _id: "",
    day: {
      _id: "",
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
    time: []
  }],
  teamSubscribed: [{
    _id: "",
    preferences: []
  }],
  rangeAgeSince: 0,
  rangeAgeUntil: 0,
  ageDescripcion: "",
  category: {
    _id: "",
    categoryName : "",
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
  deposito:0,
  cupos: 0,
  fixture: [{
    _id: "",
    jornada: 0,
    partidos: [{
      team1: {
        _id: '',
        nameList: '', 
    },
    team2: {
        _id: '',
        nameList: '',
    },
    resultado: {
        
            team1: 0,
            team2: 0
        
    }
    }]
  }],
  tablaPosiciones: [{
        team: {
          _id: '',
          nameList: '',
          typeAlineacion: 0,
          teamPicture: ''
        },
        puntos: 0,
        partidosJugados: 0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0
  }]
  }
}
tournament: Tournament = {
  nameFantasy: "",
  ano: 0,
  order: 0,
  campeonato:{
    _id: "",
    type: ""
  },
  edad: {
    _id: "",
    type: ""
  },
  daysTournament: [{
    _id: "",
    day: {
      _id: "",
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
    time: []
  }],
  teamSubscribed: [{
    _id: "",
    preferences: []
  }],
  rangeAgeSince: 0,
  rangeAgeUntil: 0,
  ageDescripcion: "",
  category: {
    _id: "",
    categoryName : "",
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
  deposito:0,
  cupos: 0,
  fixture: [{
    _id: "",
    jornada: 0,
    partidos: [{
      team1: {
        _id: '',
        nameList: '', 
    },
    team2: {
        _id: '',
        nameList: '',
    },
    resultado: {
        
            team1: 0,
            team2: 0
        
    }
    }]
  }],
  tablaPosiciones: [{
        team: {
          _id: '',
          nameList: '',
          typeAlineacion: 0,
          teamPicture: ''
        },
        puntos: 0,
        partidosJugados: 0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0
  }]
}
goleador: Player[] = [];
valla: any[] = [];
fairPlay: any[] = [];

ngOnInit() {
  this.getTournamentList()
}

getTournamentList() {
  this.userService.getTournamentsList().subscribe({
    next: (res: any) => {
      this.list.tournamentRegistration = res.tournament;
      console.log(this.list.tournamentRegistration);

      // Validamos que haya un torneo y que tenga ID
      const tournamentId = this.list.tournamentRegistration?._id;
      if (tournamentId) {
        this.goleadores();
        this.vallaMenosVencida();
        this.getFairPLay();
        this.getTournament()
      } else {
        console.log('No hay torneo registrado aún');
      }
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}

getTournament(){
  this.tournamentServ.getTournament(this.list.tournamentRegistration?._id).subscribe({
    next: (res : any) => {
      this.tournament = res.tournamentFound
      console.log("torneo:",this.tournament)
      
      this.tournament.fixture.forEach((jornada : any) => {
        jornada.partidos.forEach((match : any) => {
          if (!match.resultado) {
            match.resultado = { team1: 0, team2: 0  };
          }
        });
      });
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

goleadores(){
  this.tournamentServ.getGoleador(this.list.tournamentRegistration?._id).subscribe({
    next: (res : any) => {
      this.goleador = res.orederedGoleadores
      console.log(this.goleador)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

vallaMenosVencida(){
  this.tournamentServ.getVallaMenosVencida(this.list.tournamentRegistration?._id).subscribe({
    next: (res : any) => {
      this.valla = res.equipos;
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getFairPLay(){
  this.tournamentServ.getFairPLay(this.list.tournamentRegistration?._id).subscribe({
    next: (res : any) => {
      this.fairPlay = res.fairPlayData
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

goEliminatoria(id:any){
  this.router.navigate([`eliminatoria/${id}`])
}

getTeamNameById(id: any): any {
    const team = this.tournament.teamSubscribed.find(t => t._id === id);
    return team ? team.nameList : 'Equipo desconocido';
  }

}
