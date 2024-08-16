import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Category } from 'src/app/interfaces/Category';
import { Season } from 'src/app/interfaces/Season';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.page.html',
  styleUrls: ['./season.page.scss'],
})
export class SeasonPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private router: Router, private notifyService: NotifyService) { }
  id:any
  season: Season = {
    category: undefined,
    seasonName: "",
    seasonNotes: "",
    isSeasonOfficial: true ,
    isSeasonActive: true
  }
  categories: Category[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getSeason(this.id)
    this.getCategories()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  volver(){
    this.router.navigate(['/create-season'])
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


  getSeason(id:any){
    this.tournamentServ.getSeason(id).subscribe({
      next: (res : any) => {
        this.season = res.season
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editSeason(id:any, form:any){
    const formulario = {
      seasonName: form.seasonName.value,
      category: form.category.value,
      isSeasonOfficial: form.isSeasonOfficial.value,
      isSeasonActive: form.isSeasonActive.value,
      seasonNotes: form.seasonNotes.value
    }
    this.tournamentServ.editSeason(id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getSeason(this.id)
        this.setOpen(false)
      },
      error: (err) => {
        console.log(err.error.message) 
      }
    })
  }

  deleteSeason(id:any){
    this.tournamentServ.deleteSeason(id).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        window.location.href = '/create-season'
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

}
