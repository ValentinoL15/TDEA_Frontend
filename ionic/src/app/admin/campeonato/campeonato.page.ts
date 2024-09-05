import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.page.html',
  styleUrls: ['./campeonato.page.scss'],
})
export class CampeonatoPage implements OnInit {

  id:any;
  campeonato: Campeonato = {
    type: ""
  }

  constructor(private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getCampeonato(this.id)
  }

  volver(){
    this.router.navigate(['/create-campeonato']);
  }

  cancel(){
    this.setOpen(false)
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  getCampeonato(id : any){
    this.tournamentServ.getCampeonato(id).subscribe({
      next: (res : any) => {
        this.campeonato = res.campeonato
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  editCampeonato(form : any){
    const formulario = {
      type: form.type.value
    }
    this.tournamentServ.editCampeonato(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        setTimeout(() => {
          window.location.href = '/create-campeonato'
        }, 800)
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  eliminarCampeonato(){
    this.tournamentServ.deleteCampeonato(this.id).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        setTimeout(() => {
          window.location.href = '/create-campeonato'
        }, 800)
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

}
