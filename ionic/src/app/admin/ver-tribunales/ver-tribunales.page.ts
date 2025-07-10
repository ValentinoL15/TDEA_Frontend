import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tribunales } from 'src/app/interfaces/Tribunales';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-tribunales',
  templateUrl: './ver-tribunales.page.html',
  styleUrls: ['./ver-tribunales.page.scss'],
})
export class VerTribunalesPage implements OnInit {

  id: any;
  tribunales: Tribunales[] = [];
  constructor(private route: ActivatedRoute, private torunamentServ: TournamentService, private notifyService: NotifyService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTribunales();
  }

  getTribunales(){
    this.torunamentServ.getTribunales(this.id).subscribe({
      next: (res:any) => {
        this.tribunales = res.sanciones
        console.log(this.tribunales);
      },
      error: (err:any) => {
        console.error(err);
        this.notifyService.error(err.error.message || 'Error al obtener los tribunales');
      }
    })
  }

  volver() {
    this.router.navigate([`/admin/tournaments/${this.id}`])
  }

}
