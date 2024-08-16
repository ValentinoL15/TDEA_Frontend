import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Division } from 'src/app/interfaces/Division';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-create-division',
  templateUrl: './create-division.page.html',
  styleUrls: ['./create-division.page.scss'],
})
export class CreateDivisionPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  form:FormGroup
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor(private router: Router, private formBuilder:FormBuilder, private tournamentServ: TournamentService, private notifyServ: NotifyService) { 
    this.form = this.formBuilder.group({
      order: ['', Validators.required]
    })
  }
  divisiones: Division[] = []

  ngOnInit() {
    this.getDivisions()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  volver(){
    this.router.navigate(['/admin/admin-home'])
  }

  goDivision(id:any){
    this.router.navigate([`/division/${id}`])
  }

  getDivisions(){
    this.tournamentServ.getDivisions().subscribe({
      next: (res : any) => {
        this.divisiones = res.divisions
      },
      error: (err) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  createOrder(){
    const formulario = {
      order: this.form.value.order
    };
    this.tournamentServ.createDivision(formulario).subscribe({
      next: (res : any) => {
        this.divisiones.push(res.newDivision)
        this.notifyServ.success(res.message)
        this.cancel()
      },
      error: (err: any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
