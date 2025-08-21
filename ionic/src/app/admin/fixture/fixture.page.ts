import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
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
                    motivo: ""
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
              rojas: 0,
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
selectedFixtureIndex = 0; // jornada 1
selectedPartidoIndex = 0; // primer partido de la jornada

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

selectedTeamSegment: string = '';

setOpen(isOpen: boolean, team_id: any, vsTeam_id: any, jornada: number, local: any, visitante: any) {
  this.isModalOpen = isOpen;
  this.team_id = team_id;
  this.vsTeam_id = vsTeam_id;
  this.jornada = jornada;
  this.local = local
  this.visitante = visitante;
   if (team_id && team_id._id) {
    this.selectedTeamSegment = team_id._id;
  }

  if (isOpen && this.tournament && this.tournament.estadisticasJugadores) {
    this.filtrarJugadoresPorEquipo(this.selectedTeamSegment);
  }
}

filtrarJugadoresPorEquipo(equipoId: string) {
  this.jugadoresFiltrados = this.tournament.fixture
    .find(j => j.jornada === this.jornada)?.partidos
    .find(p => 
      (p.team1?._id === this.team_id?._id && p.team2?._id === this.vsTeam_id?._id) ||
      (p.team1?._id === this.vsTeam_id?._id && p.team2?._id === this.team_id?._id)
    )?.estadisticasJugadores
    .filter(j => j.equipo && j.equipo._id === equipoId) || [];
  
  this.jugadoresFiltrados.forEach(jugador => {
    jugador.motivoOriginal = jugador.motivo || ''; // Guarda el motivo que llegó inicialmente
  });
}

onSegmentChanged(event: any) {
  const equipoId = event.detail.value;
  this.selectedTeamSegment = equipoId;
  this.filtrarJugadoresPorEquipo(equipoId);
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

guardarCambiosTodos(jugadorId: any) {
const jugador = this.jugadoresFiltrados.find(j => j._id === jugadorId._id);
console.log("mi jugador",jugador)

  if (!jugador) {
    this.notifyService.error('ID del jugador no válido');
    return;
  }

    const cambios = {
    goles: jugador.goles || 0,
    amarillas: jugador.amarillas || 0,
    rojas: jugador.rojas || 0
  };

  console.log(cambios)

  this.tournamentService.updateJugadores(this.id,jugadorId._id,this.jornada,cambios).subscribe({
    next: (res: any) => {
      console.log('Actualizados:', res.jugador);
      this.notifyService.success('Cambios guardados correctamente');
      
      
    },
    error: (err: any) => {
      this.notifyService.error('Error al guardar los cambios');
      console.error(err);
    }
  });
}

actualizarAmarillas(jugador: any, cambio: number) {
  jugador.amarillas = (jugador.amarillas || 0) + cambio;
  //jugador.ultimaTarjeta = jugador.amarillas > 0 ? 'Amarilla' : 'Ninguna';
}

actualizarGoles(jugador: any, cambio: number) {
  jugador.goles = (jugador.goles || 0) + cambio;
}

actualizarRojas(jugador: any, cambio: number) {
  jugador.rojas = (jugador.rojas || 0) + cambio;
  //jugador.ultimaTarjeta = jugador.rojas > 0 ? 'Roja' : 'Ninguna';
}

guardarCambiosTodosDeUna() {
  const peticiones: Observable<any>[] = [];
  
  this.jugadoresFiltrados.forEach((jugador:any) => {
    if(jugador.amarillas === 2 && jugador.rojas === 1) {
      jugador.ultimaTarjeta = '2 Amarilla y Roja'
    } else if(jugador.amarillas === 1 && jugador.rojas === 1) {
      jugador.ultimaTarjeta = 'Amarilla y Roja'
    }else if(jugador.amarillas === 0 && jugador.rojas === 1){
      jugador.ultimaTarjeta = 'Roja'
    } else {
      jugador.ultimaTarjeta = null
    }
    const cambios = {
      goles: jugador.goles || 0,
      amarillas: jugador.amarillas || 0,
      rojas: jugador.rojas || 0,
      motivo: jugador.motivo || null,
      ultimaTarjeta: jugador.ultimaTarjeta
    };

    // 1️⃣ Petición para actualizar estadísticas
    peticiones.push(
      this.tournamentService.updateJugadores(
        this.id,
        jugador._id,
        this.jornada,
        cambios
      )
    );
    this.getList()
    this.getTournament()
    

    // 2️⃣ Si hay motivo escrito y tiene al menos una tarjeta => crear sanción
    //const motivo = this.motivos[jugador.jugador._id];
    if (jugador.ultimaTarjeta !== 'Ninguna' &&  jugador.motivo && 
      jugador.motivo.trim() !== '' &&
      jugador.motivo !== jugador.motivoOriginal) {
      const sancionData = {
        player_id: jugador.jugador._id,
        tarjeta: jugador.ultimaTarjeta,
        name: jugador.jugador.firstName,
        lastName: jugador.jugador.lastName,
        equipo: this.team_id?.nameList || '',
        versus: this.vsTeam_id || '',
        local: this.local,
        visitante: this.visitante,
        fecha: this.jornada,
        motivo: jugador.motivo
      };

      peticiones.push(
        this.tournamentService.crearSancion(this.id, sancionData)
      );
    }
  });

  // 3️⃣ Ejecutar todo en paralelo
  forkJoin(peticiones).subscribe({
    next: () => {
      this.notifyService.success('Cambios y sanciones procesados');
      this.getTournament();
      this.getList();
    },
    error: (err) => {
      console.error(err);
      this.notifyService.error('Error al guardar cambios y sanciones');
    }
  });
}


crearSancion(item: any, vsTeam: any, myTeam: any) {
  const motivo = this.motivos[item.jugador._id];

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
  console.log(sancionData.tarjeta)
  

  this.tournamentService.crearSancion(this.id, sancionData).subscribe({
    next: (res: any) => {
      this.notifyService.success('Sanción creada correctamente');
      item.motivo = ''; // limpiar textarea
      this.setOpen(false,null,null,0,null,null)
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
