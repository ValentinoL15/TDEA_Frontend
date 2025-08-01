import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { List } from 'src/app/interfaces/List';
import { Player } from 'src/app/interfaces/Player';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tribunales',
  templateUrl: './tribunales.page.html',
  styleUrls: ['./tribunales.page.scss'],
})
export class TribunalesPage implements OnInit {
  id: any;
  player_id: any
  player: Player | null = null;
  form: FormGroup
  fecha: any;
  vsTeam_id: any;
  list: List | null = null;
  tournament: Tournament | null = null
  local: string | null = null;
  visitante: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder, private tournamentServ: TournamentService, private notifyService: NotifyService) {
    this.form = this.fb.group({
      player_id: [this.player_id, Validators.required],
      name: [this.player?.firstName, Validators.required],
      lastName: [this.player?.lastName, Validators.required],
      equipo: [this.player?.ownerList?.nameList, Validators.required],
      tarjeta: ['', Validators.required],
      fecha: ['', Validators.required],
      versus: ['', Validators.required],
      motivo: ['', Validators.required],
      //fechas_de_expulsion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fecha = params['fecha'];
      this.vsTeam_id = params['vsTeam_id'];
      this.player_id = params['player_id'];
      this.local = params['local'];
      this.visitante = params['visitante'];
        this.form.patchValue({ player_id: this.player_id });
    })
    this.getPlayer();
    this.getTournament()
    this.getList();
  }

  getPlayer() {
    this.userService.getPlayer(this.player_id).subscribe({
      next: (res: any) => {
        this.player = res.player;
          this.form.patchValue({
        name: this.player?.firstName,
        lastName: this.player?.lastName,
        equipo: this.player?.ownerList?.nameList,
      });
        console.log("mi player", this.player);
      },
      error: (err: any) => {
        console.error('Error fetching player data:', err);
      }
    })
  }

  getList(){
    this.userService.getList(this.vsTeam_id).subscribe({
      next: (res: any) => {
        this.list = res.list;
        console.log("mi team", this.list);
      },
      error: (err: any) => {
        console.error('Error fetching team data:', err);
      }
    })
  }

  fixtureJornadas: number[] = [];

  getTournament() {
    this.tournamentServ.getTournament(this.id).subscribe({
      next: (res: any) => {
        this.tournament = res.tournamentFound;
        if (this.tournament?.fixture) {
          this.fixtureJornadas = this.tournament.fixture.map((f: any) => f.jornada);
        } else {
          this.fixtureJornadas = [];
        }
        console.log("mi tor", this.tournament)
      },
      error: (err: any) => {
        console.error('Error fetching tournament data:', err);
      }
    })
  }

  volver() {
    this.router.navigate([`/admin/fixture/${this.id}`])
  }

  crearSancion() {
    const formulario = {
      player_id: this.player_id,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      equipo: this.form.value.equipo,
      tarjeta: this.player?.ultimaTarjeta,
      fecha: this.fecha,
      versus: this.list?._id,
      motivo: this.form.value.motivo,
      //fechas_de_expulsion: this.form.value.fechas_de_expulsion
    }
    console.log('Formulario antes de enviar:', this.form.value); 
    this.tournamentServ.crearSancion(this.id, formulario).subscribe({
      
      next: (res: any) => {
        console.log('Formulario despues de enviar:', this.form.value); 
        this.notifyService.success(res.message);
        this.router.navigate([`/admin/fixture/${this.id}`]);
      },
      error: (err: any) => {
        console.error('Error al crear la sanción:', err);
        this.notifyService.error(err.error.message);
      }
    })
  }

}
