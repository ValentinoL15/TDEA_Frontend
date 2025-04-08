import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.page.html',
  styleUrls: ['./inscripcion.page.scss'],
})
export class InscripcionPage implements OnInit {

  torneoId!: string;
  eliminatoria: any[] = [];
  campeon: any = null;

  constructor(private tournamentServ: TournamentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.torneoId = this.route.snapshot.paramMap.get('id')!;
    this.cargarEliminatoria()
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
    this.router.navigate(['user/inscripciones'])
  }

}
