import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-campeonato',
  templateUrl: './create-campeonato.page.html',
  styleUrls: ['./create-campeonato.page.scss'],
})
export class CreateCampeonatoPage implements OnInit {

  form:FormGroup
  campeonatos: Campeonato[] = []
  constructor(private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      type: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getCampeonatos()
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel(){
    this.setOpen(false)
  }

  volver(){
    this.router.navigate(['/admin/admin-home'])
  }

  goCampeonato(id: any){
    this.router.navigate([`/campeonato/${id}`])
  }

  getCampeonatos(){
    this.tournamentServ.getCampeonatos().subscribe({
      next: (res : any) => {
        this.campeonatos = res.campeonatos
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  createCampeonato(){
    const formulario = {
      type: this.form.value.type
    }
    this.tournamentServ.createCampeonato(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getCampeonatos()
        this.setOpen(false)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.campeonatos, event.previousIndex, event.currentIndex);
  }

}
