import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { Category } from 'src/app/interfaces/Category';
import { Edad } from 'src/app/interfaces/Edad';
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
  campeonatos: Campeonato[] = []
  edades: Edad[] = []
  tournaments: Tournament[] = []
  tournament: Tournament = {
    _id: "",
    nameFantasy: "",
    ano: 0,
    campeonato:{
      type: ""
    } ,
    edad: {
      type: ""
    },
    rangeAgeSince: 0,
    rangeAgeUntil: 0,
    ageDescripcion: "",
    category: {
      _id: "",
      categoryName : ""
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
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0
  }
  ano:any

  currentYear = new Date().getFullYear();
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nameFantasy: ['', Validators.required],
      ano: ['', Validators.required],
      rangeAgeSince: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
rangeAgeUntil: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      category: ['', Validators.required],
      format: ['', Validators.required],
      campeonato: ['', Validators.required],
      edad: ['', Validators.required],
      isTournamentActive: ['', Validators.required],
      isTournamentMasculine: ['', Validators.required],
      tournamentDate: ['', Validators.required],
      tournamentNotes: ['', Validators.required],
      ageDescripcion: ['', Validators.required],
      tarifaInscripcion: ['', Validators.required],
      tarifaPartido: ['', Validators.required],
      cupos: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getCategories()
    this.getFormats()
    this.getTournaments()
    this.getCampeonatos()
    this.getEdades()
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

getCampeonatos(){
  this.tournamentServ.getCampeonatos().subscribe({
    next: (res : any) => {
      this.campeonatos = res.campeonatos
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getEdades(){
  this.tournamentServ.getEdades().subscribe({
    next: (res : any) => {
      this.edades = res.edades
    },
    error: (err : any) => {
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
  if(this.form.get('rangeAgeUntil')?.value < this.form.get('rangeAgeSince')?.value){
    return this.notifyService.error('EL rango de edad debe ser válido')
  }
  const formulario : Tournament = {
    nameFantasy: this.form.value.nameFantasy,
    ano: this.form.value.ano,
    rangeAgeSince: this.form.value.rangeAgeSince,
    rangeAgeUntil: this.form.value.rangeAgeUntil,
    category: this.form.value.category,
    format: this.form.value.format,
    campeonato: this.form.value.campeonato,
    edad: this.form.value.edad,
    isTournamentActive: this.form.value.isTournamentActive,
    isTournamentMasculine: this.form.value.isTournamentMasculine,
    tournamentDate: this.form.value.tournamentDate,
    tournamentNotes: this.form.value.tournamentNotes,
    ageDescripcion: this.form.value.ageDescripcion,
    tarifaInscripcion: this.form.value.tarifaInscripcion,
    tarifaPartido: this.form.value.tarifaPartido,
    cupos: this.form.value.cupos
  }
  this.tournamentServ.createTournament(formulario).subscribe({
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
  this.router.navigate([`/admin/tournaments/${id}`])
}

limitLength(event: any) {
  const input = event.target;
  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4);
  }
}

}
