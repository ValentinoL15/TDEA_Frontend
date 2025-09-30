import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-eliminatoria',
  templateUrl: './eliminatoria.page.html',
  styleUrls: ['./eliminatoria.page.scss'],
})
export class EliminatoriaPage implements OnInit {
  torneoId!: string;
  eliminatoria: any[] = [];
  campeon: any = null;
  equiposDelTorneo: any[] = [];

  modalMatch: any = null;
jugadoresFiltrados: any[] = [];
isModalOpen = false;
selectedTeamSegment!: string;

   // 👉 ganadores de la ronda anterior para asignar en la nueva
  ganadoresUltimaRonda: any[] = [];

  equiposDisponiblesPorRonda: any[][] = [];


  // 👉 fase inicial seleccionada por el usuario
  faseInicial: string = 'octavos'; // valor por defecto

  constructor(
    private tournamentServ: TournamentService, 
    private route: ActivatedRoute, 
    private notifyServ: NotifyService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.torneoId = this.route.snapshot.paramMap.get('id')!;
    this.cargarEliminatoria();
    this.cargarEquipos()
  }

  cargarEquipos() {
  this.tournamentServ.getTournament(this.torneoId).subscribe((res: any) => {
    this.equiposDelTorneo = res.tournamentFound.teamSubscribed;
  });
}


  generarEliminatoria() {
    this.tournamentServ.generarEliminatoria(this.torneoId, this.faseInicial).subscribe({
      next: (res: any) => {
        this.eliminatoria = res.faseEliminatoria;
        this.cargarEliminatoria();
        this.cargarEquipos(); // <--- así siempre tenés los equipos para los selects
      },
      error: (err) => console.error(err)
    });
  }

guardarResultado(roundIndex: number, matchIndex: number, golesTeam1: number, golesTeam2: number) {
  const partido = this.eliminatoria[roundIndex].partidos[matchIndex];

  if (!partido.team1 || !partido.team2) return;

  const body = {
    team1Goles: golesTeam1 ?? 0,
    team2Goles: golesTeam2 ?? 0
  };

  this.tournamentServ.actualizarResultadoEliminatoria(
    this.torneoId,
    roundIndex,
    partido._id,   // <-- aquí enviar el _id del partido
    body
  ).subscribe({
    next: (res: any) => {
      // Actualizamos localmente
      this.eliminatoria[roundIndex].partidos[matchIndex] = {
        ...partido,
        resultado: res.partido.resultado,
        golesTeam1: res.partido.resultado.team1,
        golesTeam2: res.partido.resultado.team2
      };
      this.notifyServ.success('Resultado guardado');
    },
    error: (err) => console.error(err)
  });
}


actualizarResultado(roundIndex: number, matchIndex: number, team1Goles: number, team2Goles: number) {
  const partido = this.eliminatoria[roundIndex].partidos[matchIndex];

  this.tournamentServ.actualizarResultadoEliminatoria(
    this.torneoId,
    roundIndex,
    matchIndex,
    { team1Goles, team2Goles }
  ).subscribe({
    next: (res: any) => {
      this.eliminatoria[roundIndex].partidos[matchIndex] = {
        ...res.partido,
        resultadoTeam1: res.partido.resultado.team1,
        resultadoTeam2: res.partido.resultado.team2
      };
      this.notifyServ.success(res.message);
    },
    error: (err) => console.error(err)
  });
}

   asignarEquipos(roundIndex: number, matchIndex: number, team1Id: string, team2Id: string) {
    if (!team1Id || !team2Id) return;

    this.tournamentServ.asignarEquipos(this.torneoId, roundIndex, matchIndex, team1Id, team2Id)
      .subscribe({
        next: (res: any) => {
          const partidoBackend = res.partido;

          // Reemplazamos los IDs por objetos completos usando la lista de equipos disponibles de esa ronda
          const team1Obj = this.equiposDisponiblesPorRonda[roundIndex].find(t => t._id === partidoBackend.team1) || null;
          const team2Obj = this.equiposDisponiblesPorRonda[roundIndex].find(t => t._id === partidoBackend.team2) || null;

          this.eliminatoria[roundIndex].partidos[matchIndex] = {
            ...partidoBackend,
            team1: team1Obj,
            team2: team2Obj
          };

          this.notifyServ.success(res.message);
          this.cargarEliminatoria(); // recarga y actualiza ganadores
          this.cargarEquipos()

          // Actualizamos los equipos disponibles de esa ronda quitando los asignados
          this.equiposDisponiblesPorRonda[roundIndex] = this.equiposDisponiblesPorRonda[roundIndex]
            .filter(t => t._id !== team1Id && t._id !== team2Id);
        },
        error: (err) => console.error(err)
      });
  }
  
 avanzarEliminatoria() {
    this.tournamentServ.avanzarEliminatoria(this.torneoId).subscribe({
      next: (res: any) => {
        this.eliminatoria.push(res.ronda);
        this.cargarEliminatoria(); // recarga y actualiza ganadores
      },
      error: (err) => console.error(err)
    });
  }

  asignarGanador(roundIndex: number, matchIndex: number, winnerTeamId: string) {
    this.tournamentServ.actualizarGanador(this.torneoId, roundIndex, matchIndex, winnerTeamId).subscribe({
      next: (res: any) => {
        this.eliminatoria[roundIndex].partidos[matchIndex] = res.partido;
        this.cargarEliminatoria();
      },
      error: (err) => console.error(err)
    });
  }

  cargarEliminatoria() {
  this.tournamentServ.verEliminatoria(this.torneoId).subscribe({
    next: (res: any) => {
      this.eliminatoria = res.faseEliminatoria;
      this.cargarEquipos();

      // Limpiamos la lista de equipos por ronda
      this.equiposDisponiblesPorRonda = [];

      // Primera ronda → todos los equipos del torneo
      if (this.eliminatoria.length > 0) {
        this.equiposDisponiblesPorRonda[0] = [...this.equiposDelTorneo];
      }

      // Para las siguientes rondas, usamos los ganadores de la ronda anterior
      for (let i = 1; i < this.eliminatoria.length; i++) {
        const rondaAnterior = this.eliminatoria[i - 1];
        this.equiposDisponiblesPorRonda[i] = rondaAnterior.partidos
          .map((p: any) => p.ganador)
          .filter(Boolean); // solo los que ganaron
      }

      // En la ronda "campeon" mostramos solo un equipo
      const ultimaRonda = this.eliminatoria[this.eliminatoria.length - 1];
      if (ultimaRonda.fase === 'campeon' && ultimaRonda.partidos.length === 1) {
        this.equiposDisponiblesPorRonda[this.eliminatoria.length - 1] =
          ultimaRonda.partidos[0].ganador ? [ultimaRonda.partidos[0].ganador] : [];
      }

      // Guardamos la fase inicial si viene del backend
      if (res.fase) this.faseInicial = res.fase;

      // Verificamos si hay campeón
      this.verificarCampeon();
    },
    error: (err) => console.error('Error cargando eliminatoria:', err)
  });
}


  verificarCampeon() {
    const ultimaRonda = this.eliminatoria[this.eliminatoria.length - 1];
    if (ultimaRonda && ultimaRonda.partidos.length === 1 && ultimaRonda.partidos[0].ganador) {
      this.campeon = ultimaRonda.partidos[0].ganador;
    } else {
      this.campeon = null;
    }
  }

  getNombreRonda(roundIndex: number): string {
    const nombres = ['32avos de final','16avos de final','Octavos de final','Cuartos de final','Semifinal','Final'];
    // cuántos equipos arrancaron
    const totalEquipos = this.eliminatoria[0].partidos.length * 2;
    const equiposEnRonda = totalEquipos / Math.pow(2, roundIndex);

    if (equiposEnRonda >= 64) return nombres[0];
    if (equiposEnRonda === 32) return nombres[1];
    if (equiposEnRonda === 16) return nombres[2];
    if (equiposEnRonda === 8) return nombres[3];
    if (equiposEnRonda === 4) return nombres[4];
    if (equiposEnRonda === 2) return nombres[5];
    if (equiposEnRonda === 1) return 'Campeón';

    return `Ronda ${roundIndex + 1}`;
  }

  volver(){
    this.router.navigate([`/admin/fixture/${this.torneoId}`])
  }

  /************************************Modal*****************************************/
  
  roundIndex!: number; // para saber en qué ronda estamos

async abrirModal(roundIndex: number, matchIndex: number) {
  try {
    const res: any = await this.tournamentServ.getPartidoEliminatoria(this.torneoId, roundIndex, matchIndex).toPromise();
    this.roundIndex = roundIndex; // Guardar el índice de la ronda actual

    this.modalMatch = res.partido; // El partido completo con estadisticasJugadores populadas

    // Setear equipo que se muestra inicialmente en el segment (local)
    this.selectedTeamSegment = this.modalMatch.team1?._id;

    // Filtrar jugadores según el equipo seleccionado
    this.filtrarJugadores(this.selectedTeamSegment);

    console.log('Partido cargado para modal:', this.modalMatch);
    console.log('Jugadores filtrados:', this.jugadoresFiltrados);

    // Abrir modal
    this.isModalOpen = true;

  } catch (error) {
    console.error('Error abriendo modal:', error);
  }
}

cerrarModal() {
  this.isModalOpen = false;
  this.modalMatch = null;
  this.jugadoresFiltrados = [];
}

onSegmentChanged(event: any) {
  this.selectedTeamSegment = event.detail.value;
  this.filtrarJugadores(this.selectedTeamSegment);
}

filtrarJugadores(teamId: string) {
  if (!this.modalMatch) return;

  // Obtenemos directamente las estadísticas del partido
  const allStats = Array.isArray(this.modalMatch.estadisticasJugadores) 
    ? this.modalMatch.estadisticasJugadores 
    : [];
  console.log("Todas las estadísticas del partido:", allStats);

  // Filtramos por teamId del jugador
  this.jugadoresFiltrados = allStats
    .filter((stat : any) => stat.equipo.toString() === teamId)
    .map((stat : any) => ({
      ...stat,
      goles: stat.goles || 0,
      amarillas: stat.amarillas || 0,
      rojas: stat.rojas || 0,
      motivo: stat.motivo || ''
    }));

  console.log("Jugadores filtrados:", this.jugadoresFiltrados);
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
  let hayErrores = false;
  let sancionesPendientes = 0;
  let sancionesCompletadas = 0;
  console.log("askijdhbasidbhisad",this.roundIndex)

  for (const jugador of this.jugadoresFiltrados) {
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
      this.tournamentServ.updateJugadoresEliminatorias(this.torneoId, jugador._id, cambios)
        .subscribe({
          next: () => console.log("Jugador actualizado"),
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

        const equipoActual = this.modalMatch.team1._id === this.selectedTeamSegment
  ? this.modalMatch.team1
  : this.modalMatch.team2;

const equipoRival = this.modalMatch.team1._id === this.selectedTeamSegment
  ? this.modalMatch.team2
  : this.modalMatch.team1;

        const sancionData = {
        player_id: jugador.jugador._id,
        tarjeta: jugador.ultimaTarjeta,
        name: jugador.jugador.firstName,
        lastName: jugador.jugador.lastName,
        equipo: equipoActual?.nameList || '',
        versus: equipoRival?._id || '',
        local: this.modalMatch.team1?.nameList || '',
        visitante: this.modalMatch.team2?.nameList || '',
        isTorneo: true,
        fecha: this.roundIndex,
        motivo: jugador.motivo
        };

        this.tournamentServ.crearSancion(this.torneoId, sancionData)
          .subscribe({
            next: () => {
              sancionesCompletadas++;
              if (sancionesCompletadas === sancionesPendientes) {
                this.notifyServ.success("✅ Todas las sanciones creadas correctamente");
                
              }
            },
            error: (err) => {
              console.error(err);
              this.notifyServ.error('❌ Error al crear una sanción');
            }
          });
      }
    }
  }

  if (hayErrores) {
    this.notifyServ.error('⚠️ Hay jugadores que necesitan un informe antes de continuar');
  }
}



/*guardarCambiosJugadores() {
  // Aquí haces PUT a tu backend para actualizar goles, amarillas, rojas e informe
  this.tournamentServ.actualizarJugadoresPartido(this.modalMatch._id, this.jugadoresFiltrados)
    .subscribe(() => {
      this.notifyServ.success('Cambios guardados');
      this.cerrarModal();
    });
}*/
}
