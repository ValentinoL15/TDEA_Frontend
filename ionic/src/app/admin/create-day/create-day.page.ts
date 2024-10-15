import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Day } from 'src/app/interfaces/Day';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.page.html',
  styleUrls: ['./create-day.page.scss'],
})
export class CreateDayPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  form:FormGroup
  id:any
  dias:Day[] = []

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      day: ['', Validators.required]
    })
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getDays(this.id)
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss( 'cancel');
  }

  volver(){
    this.router.navigate([`/admin/tournaments/${this.id}`])
  }

  goDay(id:any){
    this.router.navigate([`/admin/day/${id}`])
  }

  getDays(id:any){
    this.tournamentServ.getDays(id).subscribe({
      next: (res : any) => {
        this.dias = res.days
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  crearDia(){
    const formulario = {
      day: this.form.value.day
    }
    this.tournamentServ.createDay(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message);
        window.location.href = `/admin/create-day/${this.id}`
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
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
