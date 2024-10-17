import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { Category } from 'src/app/interfaces/Category';
import { Edad } from 'src/app/interfaces/Edad';
import { Format } from 'src/app/interfaces/Format';
import { Stadium } from 'src/app/interfaces/Stadium';
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

  stadiums: Stadium[] = []
  times = [
    "00:00", "00:15", "00:30", "00:45", 
    "01:00", "01:15", "01:30", "01:45", 
    "02:00", "02:15", "02:30", "02:45", 
    "03:00", "03:15", "03:30", "03:45", 
    "04:00", "04:15", "04:30", "04:45", 
    "05:00", "05:15", "05:30", "05:45", 
    "06:00", "06:15", "06:30", "06:45", 
    "07:00", "07:15", "07:30", "07:45", 
    "08:00", "08:15", "08:30", "08:45", 
    "09:00", "09:15", "09:30", "09:45", 
    "10:00", "10:15", "10:30", "10:45", 
    "11:00", "11:15", "11:30", "11:45", 
    "12:00", "12:15", "12:30", "12:45", 
    "13:00", "13:15", "13:30", "13:45", 
    "14:00", "14:15", "14:30", "14:45", 
    "15:00", "15:15", "15:30", "15:45", 
    "16:00", "16:15", "16:30", "16:45", 
    "17:00", "17:15", "17:30", "17:45", 
    "18:00", "18:15", "18:30", "18:45", 
    "19:00", "19:15", "19:30", "19:45", 
    "20:00", "20:15", "20:30", "20:45", 
    "21:00", "21:15", "21:30", "21:45", 
    "22:00", "22:15", "22:30", "22:45", 
    "23:00", "23:15", "23:30", "23:45"
  ];


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
      daysTournament: this.formBuilder.array([]) // Inicializa daysTournament como FormArray
    })
  }

  ngOnInit() {
    this.getCategories()
    this.getFormats()
    this.getTournaments()
    this.getCampeonatos()
    this.getEdades()
    this.getStadiums()
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

getStadiums(){
  this.tournamentServ.getEstadios().subscribe({
    next: (res : any) => {
      this.stadiums = res.stadiums
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

get daysTournament(): FormArray {
  return this.form.get('daysTournament') as FormArray;
}

// Método para agregar un nuevo día
addDayTournament() {
  const dayGroup = this.formBuilder.group({
    day: [''],
    stadium: [''],
    time: [[]] // Cambia esto si estás usando un FormControl para un select múltiple
  });
  this.daysTournament.push(dayGroup);
}

// Método para agregar un tiempo en un día específico
addTimeToDay(index: number, time: string) {
  const day = this.daysTournament.at(index) as FormGroup;
  const timeArray = day.get('time') as FormArray;
  timeArray.push(this.formBuilder.control(time, Validators.required));
}

// Método para eliminar un día
removeDayTournament(index: number) {
  if (index > -1) {
    this.daysTournament.removeAt(index);
  }
}


createTournament(){
  if(this.form.get('rangeAgeUntil')?.value < this.form.get('rangeAgeSince')?.value){
    return this.notifyService.error('EL rango de edad debe ser válido')
  }
  const daysTournament = this.form.value.daysTournament.map((dayTournament: any) => ({
    day: dayTournament.day,
    stadium: dayTournament.stadium,
    time: dayTournament.time // Suponiendo que "time" ya es un array de strings
  }));
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
    cupos: this.form.value.cupos,
    daysTournament: daysTournament // Agregar los días del torneo
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
