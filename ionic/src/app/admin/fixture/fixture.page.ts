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
@ViewChild('modalCalendario') modalCalendario!: IonModal;
@ViewChild('modalCalendarioPartido') modalCalendarioPartido!: IonModal;

partidoActual: any = null;
fechaPartidoSeleccionada: string | null = null;

fechaSeleccionada: string | null = null;
jornadaActual: any = null;

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
      fechaJornada: new Date(),
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
            fechaPartido: new Date(),
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
partidoSeleccionado: any = null;

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

// Modificamos la firma de la función para aceptar el partido
setOpen(isOpen: boolean, team_id: any, vsTeam_id: any, jornada: number, local: any, visitante: any, match: any) {
    this.isModalOpen = isOpen;
    this.team_id = team_id;
    this.vsTeam_id = vsTeam_id;
    this.jornada = jornada;
    this.local = local;
    this.visitante = visitante;
    // 🟢 NUEVO: Guardar el partido seleccionado
    this.partidoSeleccionado = match; 

    if (team_id && team_id._id) {
        this.selectedTeamSegment = team_id._id;
    }

    if (isOpen && this.tournament && this.tournament.estadisticasJugadores) {
        // ... (El resto del código de filtrado de jugadores es el mismo)
        const partido = this.tournament.fixture
          .find(j => j.jornada === this.jornada)?.partidos
          .find(p => 
            (p.team1?._id === this.team_id?._id && p.team2?._id === this.vsTeam_id?._id) ||
            (p.team1?._id === this.vsTeam_id?._id && p.team2?._id === this.team_id?._id)
          );

        this.jugadoresPorJornada = partido?.estadisticasJugadores.map(j => ({ ...j })) || [];
        this.filtrarJugadoresPorEquipo(this.selectedTeamSegment);
    }
}


jugadoresPorJornada: any[] = [];

filtrarJugadoresPorEquipo(equipoId: string) {
  this.jugadoresFiltrados = this.jugadoresPorJornada.filter(j => j.equipo?._id === equipoId);

  this.jugadoresFiltrados.forEach(jugador => {
    jugador.motivoOriginal = jugador.motivo || '';
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

  this.actualizarResultado(this.partidoSeleccionado, this.jornada);
  let hayErrores = false;
  let sancionesPendientes = 0;
  let sancionesCompletadas = 0;

  for (const jugador of this.jugadoresPorJornada) {
    jugador.errorMotivo = false;
    let ultimaTarjeta = null;

    // Validaciones
    if (jugador.amarillas === 2 && jugador.rojas === 1) {
      if (!jugador.motivo?.trim()) {
        jugador.errorMotivo = true;
        hayErrores = true;
      }
      ultimaTarjeta = '2 Amarilla y Roja';
    } else if (jugador.amarillas === 1 && jugador.rojas === 1) {
      if (!jugador.motivo?.trim()) {
        jugador.errorMotivo = true;
        hayErrores = true;
      }
      ultimaTarjeta = 'Amarilla y Roja';
    } else if (jugador.amarillas === 0 && jugador.rojas === 1) {
      if (!jugador.motivo?.trim()) {
        jugador.errorMotivo = true;
        hayErrores = true;
      }
      ultimaTarjeta = 'Roja';
    }
    jugador.ultimaTarjeta = ultimaTarjeta;

    if (!jugador.errorMotivo) {
      const cambios = {
        goles: jugador.goles || 0,
        amarillas: jugador.amarillas || 0,
        rojas: jugador.rojas || 0,
        motivo: jugador.motivo || null,
        ultimaTarjeta: jugador.ultimaTarjeta
      };

      // update inmediato
      this.tournamentService.updateJugadores(this.id, jugador._id, this.jornada, cambios)
        .subscribe({
          next: () => {
            console.log("Jugador actualizado"),
            this.getTournament()
          },
          error: (err) => console.error(err)
        });

      // crear sanción inmediata
      if (
        jugador.ultimaTarjeta &&
        jugador.ultimaTarjeta !== 'Ninguna' &&
        jugador.motivo?.trim() &&
        jugador.motivo !== jugador.motivoOriginal
      ) {
        sancionesPendientes++; // 👈 sumo una sanción a procesar

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

        this.tournamentService.crearSancion(this.id, sancionData)
          .subscribe({
            next: () => {
              sancionesCompletadas++;
              if (sancionesCompletadas === sancionesPendientes) {
                this.notifyService.success("✅ Todas las sanciones creadas correctamente");
                this.getList();
              }
            },
            error: (err) => {
              console.error(err);
              this.notifyService.error('❌ Error al crear una sanción');
            }
          });
      }
    }
  }

  if (hayErrores) {
    this.notifyService.error('⚠️ Hay jugadores que necesitan un informe antes de continuar');
  }
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
      this.setOpen(false,null,null,0,null,null,null)
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

actualizarResultado(match: any, jornada: any) {
    const { team1, team2 } = match.resultado;
    const idTorneo = this.id;
    const partidoId = match._id;
    const jornadaNum = jornada;

    const form = {
        team1: team1,
        team2: team2
    };

    this.tournamentService.actualizarResultado(idTorneo, jornadaNum, partidoId, form).subscribe({
        next: (res: any) => {
            // 1. Mostrar notificación
            this.notifyService.success(res.message);

            // 2. ACTUALIZACIÓN DIRECTA: Reemplazar las propiedades del torneo con los datos frescos del servidor.
            //    Esto obliga al DOM a refrescarse inmediatamente por la magia de Angular.
            if (res.fixture && res.tablaPosiciones) {
                this.tournament.fixture = res.fixture; 
                this.tournament.tablaPosiciones = res.tablaPosiciones;
                
                // Opcional: Si 'this.getTournament()' es muy ligero, puedes mantenerlo,
                // pero si 'res' trae los datos, esta línea es a menudo innecesaria.
                // Si la actualización directa falla, se mantiene la recarga completa como respaldo.
                // this.getTournament(); 
            } else {
                // Si el backend no devuelve los datos, recurrimos a la recarga completa
                this.getTournament();
            }
        },
        error: (err: any) => {
            this.notifyService.error(err.error.message);
        }
    });
}

actualizarResultadosJornada(jornada: any) {
  const idTorneo = this.id; 
  const jornadaNum = jornada.jornada;

  // 1. Mapear (transformar) los partidos para el formato que espera el backend
  const partidosAActualizar = jornada.partidos
    .filter((match: any) => !match.libre) // Ignoramos partidos libres (BYE)
    .map((match: any) => {
      // Usamos 'match.resultado.team1' y 'match.resultado.team2' que el ngModel ha actualizado localmente
      const resultado = match.resultado || {}; 
      
      return {
        partidoId: match._id,
        // Aseguramos que los valores sean números, por si acaso
        team1: Number(resultado.team1) || 0,
        team2: Number(resultado.team2) || 0
      };
    })
    // Opcional: Filtramos solo partidos con resultados ingresados, aunque el backend maneja 0-0.
    // Lo mantengo simple: enviamos todos los partidos no libres con sus resultados (incluido 0-0).
    // Si quieres enviar solo los que tienen resultados (no nulos), debes ajustar el filtro aquí.


  // 2. Crear el formulario de envío (payload)
  const formActualizacion = {
      jornada: jornadaNum,
      partidos: partidosAActualizar
  };

  // console.log('Datos a enviar:', formActualizacion); 

  // 3. Llamar al servicio (usa el nuevo método que creaste en el service)
  this.tournamentService.actualizarResultadosJornada(idTorneo, formActualizacion).subscribe({
    next: (res: any) => {
      // El backend devuelve el torneo actualizado, recargamos la vista.
      this.notifyService.success(res.message || `Fecha ${jornadaNum} actualizada.`);
      this.getTournament(); // Asumo que esto recarga 'this.tournament' con los datos actualizados
    },
    error: (err: any) => {
      const errorMessage = err.error?.message || 'Error al actualizar resultados de la jornada.';
      this.notifyService.error(errorMessage);
    }
  });
}

editFechaJornada(jornada: any, newDate: any) {
  console.log('Editando fecha de jornada:', jornada.jornada, 'nueva fecha:', newDate);
  this.tournamentService.editFechaJornada(this.id, jornada.jornada, newDate).subscribe({
    next: (res: any) => {
      this.notifyService.success(res.message || `Fecha de la jornada ${jornada.jornada} actualizada.`);
      this.getTournament(); 
    },
    error: (err: any) => {
      const errorMessage = err.error?.message || 'Error al actualizar la fecha de la jornada.';
      this.notifyService.error(errorMessage);
    }
  })
}

 abrirCalendario(jornada: any) {
    this.jornadaActual = jornada;
    this.fechaSeleccionada = jornada.fechaJornada || null;
    this.modalCalendario.present();
  }

  cerrarModal() {
    this.modalCalendario.dismiss();
  }

  cambiarFecha(event: any) {
    const nuevaFecha = event.detail.value;

    this.jornadaActual.fechaJornada = nuevaFecha;
    console.log("jornada actual", this.jornadaActual);


    // 👉 Llamar al backend para actualizar la fecha
    this.editFechaJornada(this.jornadaActual, nuevaFecha);

    this.modalCalendario.dismiss();
  }

  abrirCalendarioPartido(partido: any) {
  this.partidoActual = partido;
  this.fechaPartidoSeleccionada = partido.fechaPartido || null;
  this.modalCalendarioPartido.present();
}

cambiarFechaPartido(event: any) {
  const nuevaFecha = event.detail.value;

  // Actualizo en memoria
  this.partidoActual.fechaPartido = nuevaFecha;
  console.log("mi partidazxo",this.partidoActual._id)

  // Llamada al backend
  this.tournamentService.editFechaPartido(
    this.id,
    this.jornada,
    this.partidoActual._id,
    nuevaFecha
  ).subscribe({
    next: (res: any) => {
      this.notifyService.success("Fecha del partido actualizada");
      this.getTournament(); // refrescar fixture
    },
    error: () => {
      this.notifyService.error("No se pudo actualizar la fecha del partido");
    }
  });

  this.modalCalendarioPartido.dismiss();
}


cerrarModalPartido() {
  this.modalCalendarioPartido.dismiss();
}

actualizarEstadoPartido() {
  console.log("Partido seleccionado para actualizar estado:", this.partidoSeleccionado);
  this.tournamentService.actualizarEstadoPartido(
    this.id,
    this.jornada,
    this.partidoSeleccionado._id,
    this.partidoSeleccionado.estado
  ).subscribe({
    next: () => {
      this.notifyService.success("Estado actualizado correctamente");
      this.getTournament(); // refrescar fixture
    },
    error: (err) => this.notifyService.error("No se pudo actualizar el estado del partido")
  });
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
