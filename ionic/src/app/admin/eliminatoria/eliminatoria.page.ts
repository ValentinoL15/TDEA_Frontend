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

  volver(){
    this.router.navigate([`/admin/fixture/${this.torneoId}`])
  }
}
