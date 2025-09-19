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

        // Guardamos los ganadores de la última ronda para selects
        const ultimaRonda = this.eliminatoria[this.eliminatoria.length - 1];
        this.equiposDisponiblesPorRonda[this.eliminatoria.length] = ultimaRonda
          ? ultimaRonda.partidos.map((p: any) => p.ganador).filter(Boolean)
          : [];

        if (res.fase) this.faseInicial = res.fase;
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
}
