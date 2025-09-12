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

  constructor(
    private tournamentServ: TournamentService, private route: ActivatedRoute, private notifyServ: NotifyService, private router: Router
  ) {}

  ngOnInit() {
    this.torneoId = this.route.snapshot.paramMap.get('id')!;
    this.cargarEliminatoria();
    
    // Podés cargar eliminatoria aquí si ya está generada
  }

  generarEliminatoria() {
    this.tournamentServ.generarEliminatoria(this.torneoId).subscribe({
      next: (res: any) => {
        this.eliminatoria = res.faseEliminatoria;
        this.cargarEliminatoria();
      },
      error: (err) => console.error(err)
    });
  }

  avanzarEliminatoria() {
    this.tournamentServ.avanzarEliminatoria(this.torneoId).subscribe({
      next: (res: any) => {
        this.eliminatoria.push(res.ronda);
        this.cargarEliminatoria()
      },
      error: (err) => console.error(err)
    });
  }

  asignarGanador(roundIndex: number, matchIndex: number, winnerTeamId: string) {
    this.tournamentServ.actualizarGanador(this.torneoId, roundIndex, matchIndex, winnerTeamId).subscribe({
      next: (res: any) => {
        this.eliminatoria[roundIndex].partidos[matchIndex] = res.partido;
        this.cargarEliminatoria()
      },
      error: (err) => console.error(err)
    });
  }

  cargarEliminatoria() {
    this.tournamentServ.verEliminatoria(this.torneoId).subscribe({
      next: (res: any) => {
        this.eliminatoria = res.faseEliminatoria;
        this.verificarCampeon(); // 👈
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
  if (!this.eliminatoria.length) return `Ronda ${roundIndex + 1}`;

  // total de equipos que arrancaron
  const totalEquipos = this.eliminatoria[0].partidos.length * 2;
  // equipos que quedan en esta ronda
  const equiposEnRonda = totalEquipos / Math.pow(2, roundIndex);

  if (equiposEnRonda >= 32) return `Dieciseisavos de final`;
  if (equiposEnRonda === 16) return `Octavos de final`;
  if (equiposEnRonda === 8) return `Cuartos de final`;
  if (equiposEnRonda === 4) return `Semifinal`;
  if (equiposEnRonda === 2) return `Final`;
  if (equiposEnRonda === 1) return `Campeón`;

  return `Ronda ${roundIndex + 1}`;
}



  volver(){
    this.router.navigate([`/admin/fixture/${this.torneoId}`])
  }
}
