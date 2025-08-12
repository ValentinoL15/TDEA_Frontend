import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsatdisticaJugador } from 'src/app/interfaces/EstadisiticaJugador';
import { Player } from 'src/app/interfaces/Player';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.page.html',
  styleUrls: ['./tablas.page.scss'],
})
export class TablasPage implements OnInit {

  id:any;
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
    estadisticasJugadores: [
                {
                    jugador: {
                      _id: "",
                      firstName: ""
                    },
                    equipo: {
                      typeAlineacion: 0,
                      teamPicture: "",
                      nameList: ""
                    },
                    goles: 0,
                    amarillas: 0,
                    rojas: 0,
                }
            ],
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
goleador: EsatdisticaJugador[] = [];
valla: any[] = [];
fairPlay: any[] = [];

  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, private notifyService: NotifyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
    this.id = params['id']
  })
    this.getTournament()
    this.goleadores();
    this.vallaMenosVencida();
    this.getFairPLay();
  }

  getTournament(){
  this.tournamentService.getTournament(this.id).subscribe({
    next: (res : any) => {
      this.tournament = res.tournamentFound
      this.tournament.fixture.forEach((jornada : any) => {
        jornada.partidos.forEach((match : any) => {
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

goleadores() {
  this.tournamentService.getGoleador(this.id).subscribe({
    next: (res: any) => {
      // Filtrar jugadores que tengan al menos 1 gol
      this.goleador = res.orederedGoleadores.filter((jugador: any) => jugador.goles > 0);
      console.log("Goleadores:", this.goleador);
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}

vallaMenosVencida(){
  this.tournamentService.getVallaMenosVencida(this.id).subscribe({
    next: (res : any) => {
      this.valla = res.equipos;
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getFairPLay(){
  this.tournamentService.getFairPLay(this.id).subscribe({
    next: (res : any) => {
      this.fairPlay = res.fairPlayData
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

  getTeamPicture(nameList: any): string {
  const equipo = this.tournament?.teamSubscribed?.find(team => team.nameList === nameList);
  return equipo?.teamPicture || 'assets/default-team.png'; // Imagen por defecto si no encuentra
}

 volver(){
    this.router.navigate(['/admin/tournaments/' + this.id]);
  }

}
