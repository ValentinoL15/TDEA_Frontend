import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {

id:any
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

constructor(private route : ActivatedRoute, private notifyService: NotifyService, private router: Router, private tournamentService: TournamentService) { }

ngOnInit() {
  this.route.params.subscribe((params) => {
    this.id = params['id']
  })
  this.getTournament()
}

volver(){
  this.router.navigate([`/admin/tournaments/${this.id}`])
}

getTournament(){
  this.tournamentService.getTournament(this.id).subscribe({
    next: (res : any) => {
      this.tournament = res.tournamentFound
      console.log(this.tournament)
      console.log("Fixture cargado:", JSON.stringify(this.tournament.fixture, null, 2));
      this.tournament.fixture.forEach(jornada => {
        jornada.partidos.forEach(match => {
          if (!match.resultado) {
            match.resultado = { team1: 0, team2: 0  };
          }
          if (!match.resultado) {
            match.resultado = { team1: 0, team2: 0 };
          }
        });
      });
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

generarFixture(){
  this.tournamentService.generateFixture(this.id, {}).subscribe({
    next: (res : any) => {
      this.tournament = res.fixture; 
      this.notifyService.success(res.message)
      this.getTournament()
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

actualizarResultado(match: any, jornada:any) {
  const { team1, team2 } = match.resultado;

  const idTorneo = this.id;  // Reemplaza con el id de tu torneo
  const partidoId = match._id;
  const jornadaNum = jornada


  console.log(match.resultado)

  const form = {
    team1: team1,
    team2: team2
  };

  // Llamamos al servicio para actualizar el resultado
  this.tournamentService.actualizarResultado(idTorneo, jornadaNum, partidoId, form).subscribe({
    next: (res: any) => {
      this.notifyService.success(res.message);
      this.getTournament()
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  }
  );
}

}
