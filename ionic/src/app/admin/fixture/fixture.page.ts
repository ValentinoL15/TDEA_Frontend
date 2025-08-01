import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
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
@ViewChild(IonModal) modal!: IonModal;
id:any
jornada: number = 0;
local: string | null = null;
visitante: string | null = null;
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
team_id: List | null = null
vsTeam_id: List | null = null
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
  _id: "",
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
form: FormGroup
id_player:any
player: Player | null = null;
motivo: string = ''; // lo escribe el admin
motivos: { [key: string]: string } = {}; // objeto con claves por ID del jugador
amarillasPorJugador: { [jugadorId: string]: number } = {};

constructor(private route : ActivatedRoute, private notifyService: NotifyService, private router: Router, private tournamentService: TournamentService, private userService: UserService, private fb: FormBuilder) { 
   this.form = this.fb.group({
        player_id: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        equipo: ['', Validators.required],
        local: ['', Validators.required],
        visitante: ['', Validators.required],
        tarjeta: ['', Validators.required],
        fecha: ['', Validators.required],
        versus: ['', Validators.required],
        motivo: ['', Validators.required],
        //fechas_de_expulsion: ['', Validators.required],
      });
}

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
jugadoresFiltrados: any[] = [];


setOpen(isOpen: boolean, team_id: any, vsTeam_id: any, jornada: number, local: any, visitante: any) {
  this.isModalOpen = isOpen;
  this.team_id = team_id;
  this.vsTeam_id = vsTeam_id;
  this.jornada = jornada;
  this.local = local
  this.visitante = visitante;
  console.log("sapeee", team_id, vsTeam_id, jornada, local, visitante)
  console.log("Jugadores filtrados:", this.tournament.estadisticasJugadores);
  

  if (isOpen && this.tournament && this.tournament.estadisticasJugadores) {
    this.jugadoresFiltrados = this.tournament.estadisticasJugadores.filter(
      (jugador) => jugador.equipo === team_id._id
      
    );
  }
  if (team_id && team_id !== 'null') {
    this.getList();
    
  } else {
    console.warn('ID de equipo inválido:', team_id);
  }
}

getList(){
  this.userService.getList(this.team_id?._id).subscribe({
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

guardarCambiosTodos(jugador: any) {
   if (!jugador._id) {
    this.notifyService.error('ID del jugador no válido');
    return;
  }
 const cambio = {
    id: jugador._id,
    goles: jugador.goles || 0,
    amarillas: jugador.amarillas || 0,
    rojas: jugador.rojas || 0
  };
  console.log("cambio",cambio)

  this.tournamentService.updateJugadores(this.id,[cambio]).subscribe({
    next: (res: any) => {
      console.log('Actualizados:', res.resultados);
      this.notifyService.success('Cambios guardados correctamente');
      this.getTournament();
      this.getList();
    },
    error: (err: any) => {
      this.notifyService.error('Error al guardar los cambios');
      console.error(err);
    }
  });
}

guardarCambiosTodos2() {
  const cambios = this.jugadoresFiltrados
    .filter(j => j.jugador && j.jugador._id) // nos aseguramos que tenga ID
    .map(j => ({
      id: j.jugador._id, // O j._id si lo tenés ahí
      goles: j.goles || 0,
      amarillas: j.amarillas || 0,
      rojas: j.rojas || 0
    }));

  if (cambios.length === 0) {
    this.notifyService.error('No hay cambios para guardar');
    return;
  }

  this.tournamentService.updateJugadores(this.id, cambios).subscribe({
    next: (res: any) => {
      console.log('Actualizados:', res.resultados);
      this.notifyService.success('Cambios guardados correctamente');
      this.getTournament();
      this.getList();
    },
    error: (err: any) => {
      this.notifyService.error('Error al guardar los cambios');
      console.error(err);
    }
  });
}


crearSancion(item: any, vsTeam: any, myTeam: any) {
  console.log("Mi id:", item.jugador._id)
  const motivo = this.motivos[item.jugador._id];
  console.log("mi motiv", motivo)

  if (!motivo || item.ultimaTarjeta === 'Ninguna') {
    this.notifyService.error('Debe ingresar un motivo y haber al menos una tarjeta');
    return;
  }

  const sancionData = {
    player_id: item.jugador._id,
    tarjeta: item.ultimaTarjeta,
    name: item.jugador.firstName,
    lastName: item.jugador.lastName,
    equipo: myTeam, // asumimos que tenés guardado el nombre del equipo
    versus: vsTeam || 'N/A',
    local: this.local,
    visitante: this.visitante,
    fecha: this.jornada,
    motivo: motivo
  };

  this.tournamentService.crearSancion(this.id, sancionData).subscribe({
    next: (res: any) => {
      this.notifyService.success('Sanción creada correctamente');
      item.motivo = ''; // limpiar textarea
    },
    error: (err: any) => {
      console.error(err);
      this.notifyService.error('Error al crear la sanción');
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

goTribunales(player_id:any, fecha:any, vsTeam_id:any,local:any, visitante:any) {
  if (this.modal) {
    this.modal.dismiss(); // Cierra el modal correctamente
    this.isModalOpen = false; // Actualiza el estado del modal
  }
  this.router.navigate([`/tribunales/${this.id}`, player_id, fecha, vsTeam_id, local, visitante]); // Luego navega
}
}
