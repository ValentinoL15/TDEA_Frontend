import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from 'src/app/interfaces/Day';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-informes-preferences',
  templateUrl: './informes-preferences.page.html',
  styleUrls: ['./informes-preferences.page.scss'],
})
export class InformesPreferencesPage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService) { }

id:any;
dayId: any;
day: Day = {
  day: "",
  horarios: {
    times: []
  }
}
tournament: Tournament = {
  nameFantasy: "",
  ano: 0,
  campeonato:{
    _id: "",
    type: ""
  },
  edad: {
    _id: "",
    type: ""
  },
  teamSubscribed: [{
    _id: "",
    preferences: []
  }],
  rangeAgeSince: 0,
  rangeAgeUntil: 0,
  ageDescripcion: "",
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
    time: []
  }],
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
        puntos: 0,
        partidosJugados: 0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0
  }],
  tournamentDate: new Date(),
  tournamentNotes: "",
  isTournamentMasculine: false,
  isTournamentActive: false,
  tarifaInscripcion: 0,
  tarifaPartido: 0,
  cupos: 0,
}
dayIndex: number = 0



ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    this.dayId = params['dayId'];
    this.dayIndex = params['dayIndex']
  })
  this.getTournament()
}

getTournament() {
  this.tournamentServ.getDayTournament(this.id, this.dayId).subscribe({
    next: (res: any) => {
      console.log('Datos de horarios:', res.day.time); // Verifica si los datos existen
      console.log('Datos de preferencias del equipo:', res.tournament.teamSubscribed);
      this.tournament = res.tournament
      console.log(this.tournament)
      this.day = {
        ...res.day,
        horarios: {
          ...res.day.horarios,
          times: res.day.time || [] // Asigna las cadenas directamente
        }
      }
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}

updateAllPreferences() {
  const updatedTeams = this.tournament.teamSubscribed.map(team => ({
    id: team._id,
    preferences: team.preferences
  }));

  this.tournamentServ.updateTeamsPreferences(this.id, updatedTeams).subscribe({
    next: () => {
      this.notifyService.success('Preferencias actualizadas correctamente');
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}



volver(){
  this.router.navigate([`/admin/informes-info/${this.id}`]);
}

}
