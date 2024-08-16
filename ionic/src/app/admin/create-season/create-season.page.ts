import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Category } from 'src/app/interfaces/Category';
import { Season } from 'src/app/interfaces/Season';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.page.html',
  styleUrls: ['./create-season.page.scss'],
})
export class CreateSeasonPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  form:FormGroup
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  seasons: Season[] = [];
  categories: Category[] = []

  constructor(private router: Router, private formBuilder:FormBuilder, private tournamentServ: TournamentService, private notifyServ: NotifyService) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      seasonName: ['', Validators.required],
      seasonNotes: ['', Validators.required],
      isSeasonOfficial: ['', Validators.required],
      isSeasonActive: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getSeasons();
    this.getCategories();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.form.reset()
  }

  volver(){
    this.router.navigate(['/admin/admin-home'])
  }

  goSeason(id:any){
    this.router.navigate([`/season/${id}`])
  }


  getCategories(){
    this.tournamentServ.getCategories().subscribe({
      next: (res : any) => {
        this.categories = res.categories
      },
      error: (err) => {
        console.log(err.error.message)
      }
    })
  }

  getSeasons(){
  this.tournamentServ.getSeasons().subscribe({
    next: (res : any) => {
      this.seasons = res.seasons
    },
    error: (err) => {
      this.notifyServ.error(err.error.mesage)
    }
  })
  }

  createSeason(){
    const formulario = {
      category: this.form.value.category,
      seasonName: this.form.value.seasonName,
      seasonNotes: this.form.value.seasonNotes,
      isSeasonOfficial: this.form.value.isSeasonOfficial,
      isSeasonActive: this.form.value.isSeasonActive
    }
    this.tournamentServ.createSeason(formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)
        this.seasons.push(res.newSeason)
        this.cancel()
        this.form.reset()
      },
      error: (err) => {
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
