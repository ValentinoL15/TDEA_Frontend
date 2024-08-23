import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Format } from 'src/app/interfaces/Format';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';


@Component({
  selector: 'app-home-tournament',
  templateUrl: './home-tournament.page.html',
  styleUrls: ['./home-tournament.page.scss'],
})
export class HomeTournamentPage implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  formats: Format[] = []
  tournaments: Tournament[] = []
  tournament: Tournament = {
    _id: "",
    nameFantasy: "",
    category: {
      _id: "",
      categoryName : "",
      ageLimiter : 0
    },
    format: {
      _id:"",
    formatName: "",
    minPlayers: 0,
    maxPlayers: 0
    },
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false
  }
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nameFantasy: ['', Validators.required],
      category: ['', Validators.required],
      format: ['', Validators.required],
      isTournamentActive: ['', Validators.required],
      isTournamentMasculine: ['', Validators.required],
      tournamentDate: ['', Validators.required],
      tournamentNotes: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getCategories()
    this.getFormats()
    this.getTournaments()
  }

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

getCategories(){
  this.tournamentServ.getCategories().subscribe({
    next: (res : any) => {
      this.categories = res.categories
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getFormats(){
  this.tournamentServ.getFormats().subscribe({
    next: (res : any) => {
      this.formats = res.formats
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

createTournament(){
  const form : Tournament = {
    nameFantasy: this.form.value.nameFantasy,
    category: this.form.value.category,
    format: this.form.value.format,
    isTournamentActive: this.form.value.isTournamentActive,
    isTournamentMasculine: this.form.value.isTournamentMasculine,
    tournamentDate: this.form.value.tournamentDate,
    tournamentNotes: this.form.value.tournamentNotes
  }
  this.tournamentServ.createTournament(form).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getTournaments()
      this.setOpen(false)
      this.router.navigate(['/admin/home-tournament'])
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getTournaments(){
  this.tournamentServ.getTournaments().subscribe({
    next: (res : any) => {
      this.tournaments = res.tournaments
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

goTournament(id:any){
  this.router.navigate([`/tournaments/${id}`])
}

}
