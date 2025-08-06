import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-informes-info',
  templateUrl: './informes-info.page.html',
  styleUrls: ['./informes-info.page.scss'],
})
export class InformesInfoPage implements OnInit {

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
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0,
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
  }
  currentYear = new Date().getFullYear();
  uniqueSedes: any[] = [];
constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute) { }

id:any

ngOnInit() {
this.route.params.subscribe(params => {
  this.id = params['id'];
})
  this.getTournament(this.id)
  this.uniqueSedes = [...new Set(this.tournament?.daysTournament?.map(d => d.sede?.name || '') || [])];
}

volver(){
  this.router.navigate(['/admin/informes']);
}

getDays(tournament: Tournament){
  return tournament.daysTournament?.map(day => day.day)
}

getTournament(id:any){
  this.tournamentServ.getTournament(id).subscribe({
    next: (res : any) => {
      this.tournament = res.tournamentFound
      this.tournament.tournamentDate = this.adjustDate(new Date(this.tournament.tournamentDate));
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

adjustDate(date: Date): Date {
  // Ajuste para compensar el desfase de la zona horaria
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() + offset * 60000);
  return adjustedDate;
}

getTeamsSubscribed(){
  return this.tournament.teamSubscribed?.length;
}

goTeams(tournamentId: string, dayId: any, dayIndex: any) {
  this.router.navigate([`/admin/informes-preferences/${tournamentId}/${dayId}/${dayIndex}`]);
}


}
