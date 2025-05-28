import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/interfaces/List';
import { Player } from 'src/app/interfaces/Player';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {

id:any
goleador: Player[] = [];
valla: any[] = [];
fairPlay: any[] = [];
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
team_id: any
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
id_player:any
constructor(private route : ActivatedRoute, private notifyService: NotifyService, private router: Router, private tournamentService: TournamentService, private userService: UserService) { }

ngOnInit() {
  this.route.params.subscribe((params) => {
    this.id = params['id']
  })
  this.getTournament()
  this.goleadores()
  this.vallaMenosVencida()
  this.getFairPLay()
}

volver(){
  this.router.navigate([`/admin/tournaments/${this.id}`])
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

getTeamNameById(id: any): any {
  const team = this.tournament.teamSubscribed.find(t => t._id === id);
  return team ? team.nameList : 'Equipo desconocido';
}

goleadores(){
  this.tournamentService.getGoleador(this.id).subscribe({
    next: (res : any) => {
      this.goleador = res.orederedGoleadores
      console.log("Goleadores:",this.goleador)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
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

isModalOpen = false;

setOpen(isOpen: boolean, team_id: any) {
  this.isModalOpen = isOpen;
  this.team_id = team_id;

  if (team_id && team_id !== 'null') {
    this.getList();
  } else {
    console.warn('ID de equipo inválido:', team_id);
  }
}

getList(){
  this.userService.getList(this.team_id).subscribe({
    next: (res : any) => {
      this.list = res.list
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

actualizarTarjetas(id: any, form: any) {
  const formulario = {
    goles: form.value.goles,
    amarillas: form.value.amarillas,
    rojas: form.value.rojas
  };

  this.tournamentService.updateTarjetas(id, formulario).subscribe({
    next: (res: any) => {
      this.notifyService.success(res.message);
      this.getTournament();
      this.getList();
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}

restar(valor: number) {
  return valor > 0 ? valor - 1 : 0;
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

goEliminatoria(){
  this.router.navigate(['/admin/eliminatoria', this.id]);
}
}
