import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Division } from 'src/app/interfaces/Division';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.page.html',
  styleUrls: ['./division.page.scss'],
})
export class DivisionPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  id:any
  division: Division = {
    order: 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private torunamentServ : TournamentService, private notifyService : NotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getDivision(this.id)
    })
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/create-division'])
  }

  getDivision(id:any){
    this.torunamentServ.getDivision(id).subscribe({
      next: (res:any) => {
        this.division = res.division
      },
      error: (err:any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  updateDivision(id:any, form:any){
    const formulario = {
      order: form.order.value
    }
    this.torunamentServ.editDivision(id,formulario).subscribe({
      next: (res:any) => {
        this.notifyService.success(res.message)
        this.getDivision(id)
        this.setOpen(false)
      },
      error: err => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  deleteDivision(id:any){
    this.torunamentServ.deleteDivision(id).subscribe({
      next: (res:any) => {
        this.notifyService.success(res.message)
        window.location.href = "/create-division"
      },
      error: (err:any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

}
