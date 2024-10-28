import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Day } from 'src/app/interfaces/Day';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Stadium } from 'src/app/interfaces/Stadium';


@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.page.html',
  styleUrls: ['./create-day.page.scss'],
})
export class CreateDayPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  form:FormGroup
  id:any
  dias:Day[] = [];
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
    daysTournament: [{
      _id: "",
      day: {
        _id: "",
        type: ""
      },
      stadium: {
        _id: "",
        belongToSede: "",
        code: "",
        type: 0,
        length: 0,
        width: 0,
        roof: "",
        grass: "",
        punctuaction: 0,
      },
      time: {
        _id: "",
        type: []
      }
    }],
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0
  }
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
  filteredStadiums: any[] = []; // Para almacenar los estadios filtrados
  sedes: any[] = [];


  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      day: ['', Validators.required],
      sede: ['', Validators.required], // Asegúrate de que esto esté aquí
      stadium: ['', Validators.required],
      time: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getTournament()
    this.getStadiums()
    this.getSedes()
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

  getTournament(){
    this.tournamentServ.getTournament(this.id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound;
        console.log(this.tournament)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getStadiums(){
    this.tournamentServ.getEstadios().subscribe({
      next: (res : any) => {
        this.stadiums = res.stadiums
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getSedes(){
    this.tournamentServ.getMySedes().subscribe({
      next: (res : any) => {
        this.sedes = res.mySedes
        console.log("mis sedes", this.sedes)
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  createDay(){
    const formulario = {
      day: this.form.value.day,
      sede: this.form.value.sede,
      stadium: this.form.value.stadium,
      time: this.form.value.time
    }
    this.tournamentServ.createDayTournament(this.id, formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success('Dia creado con exito')
        setTimeout(() => {
          window.location.href = `admin/create-day/${this.id}`
        }, 500)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  onVenueChange(event: any) {
    const selectedVenueId = event.detail.value; // ID de la sede seleccionada
    this.form.get('sede')?.setValue(selectedVenueId); // Actualiza el valor de la sede en el formulario
    this.filteredStadiums = this.stadiums.filter(stadium => stadium.belongToSede === selectedVenueId);
    
    // Opcional: Limpiar la selección de estadio cuando cambia la sede
    this.form.get('stadium')?.setValue(null);
  }


goDay(id: any) {
  this.router.navigate([`/day/${this.id}/${id}`]);
}

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
