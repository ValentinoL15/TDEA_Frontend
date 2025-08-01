import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from 'src/app/interfaces/Day';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Schedule } from 'src/app/interfaces/Schedule';
import { AlertController } from '@ionic/angular';
import { Stadium } from 'src/app/interfaces/Stadium';
import { Sede } from 'src/app/interfaces/Sede';
import { Tournament } from 'src/app/interfaces/Tournament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  id:any;
  dayId:any;

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
    teamSubscribed: [{
      _id: "",
      preferences: []
    }],
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
        type: "",
        length: 0,
        width: 0,
        roof: "",
        grass: "",
        punctuaction: "",
      },
      sede: {
        name: "",
        alias: "",
        status: "",
        phone: 0,
        celular: 0,
        images: [],
        adress: "",
        barrio: "",
        socialRed: "",
        encargado: "",
        dueno: "",
        daysAttention: [{
          day: "",
          start: "",
          end: "",
      }],
      },
      time: []
    }],
    fixture: [{
      _id: "",
      jornada: 0,
      partidos: [{
        team1: {
          _id: '',
      },
      team2: {
          _id: '',
      },
      local: {
          _id: '',
          nameList: ''
      },
      visitante: {
          _id: '',
          nameList: ''
      },
      resultado: {
              team1: 0,
              team2: 0
          
      }
      }]
    }],
    tablaPosiciones: [{
          puntos: 0,
          partidosJugados: 0,
          ganados: 0,
          empatados: 0,
          perdidos: 0,
          golesAFavor: 0,
          golesEnContra: 0,
          diferenciaGoles: 0
    }],
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0
  }

  tournamentDay: any = null;
  selectedStadium: string | null = null; 

  horarios: Schedule[] = []
  newTime: string = '';  // Variable para almacenar el horario nuevo
  selectedTimes: string[] = []; 
  stadiums: Stadium[] = [];
  sedes: Sede[] = [];
  selectedVenue: string | null = null; 
  filteredStadiums: Stadium[] = [];
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
    "23:00", "23:15", "23:30", "23:45", "A definir"
  ];


  addTime() {
    if (this.newTime) {
      this.times.push(this.newTime);  // Agrega el nuevo horario al array
      this.newTime = '';  // Resetea el campo para nuevos ingresos
      console.log(this.times)
    }
  }

  removeTime(index: number) {
    this.times.splice(index, 1);  // Elimina el horario seleccionado
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
  setResult(ev : any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  dayForm: FormGroup
  isButtonDisabled: boolean = true;

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController, private fb: FormBuilder ) {
    this.dayForm = this.fb.group({
      day: [''],
      sede: [null, Validators.required], // Campo para la sede
      stadium: [''],
      time: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.dayId = params['dayId']
    })
    this.getDayTournament()
    this.getStadiums()
    this.getSedes()
    // Suscribirse a los cambios en el formulario
    this.dayForm.valueChanges.subscribe(() => {
      this.isButtonDisabled = !(
        this.dayForm.get('day')?.dirty ||
        this.dayForm.get('stadium')?.dirty ||
        this.dayForm.get('time')?.dirty
      );
    });
  }

  goSchedule(id : any){
    this.router.navigate([`/admin/edit-horarios/${id}`])
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/admin/create-day/${this.id}`])
    this.dayForm.reset()
  }

  onVenueChange(event: any) {
    const selectedVenueId = event.detail.value;
    console.log('Sede seleccionada:', selectedVenueId); // Verifica que el valor sea correcto
    this.filteredStadiums = this.stadiums.filter(stadium => stadium.belongToSede === selectedVenueId || selectedVenueId === "A definir");
    this.dayForm.get('stadium')?.setValue(null); // Opcional: limpiar la selección de estadio
  }

  getTournament(){
    this.tournamentServ.getTournament(this.tournament.daysTournament).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound;
        console.log(this.tournament)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }
  
  getDayTournament() {
    this.tournamentServ.getDayTournament(this.id, this.dayId).subscribe({
      next: (res: any) => {
        if (res.day) {
          this.tournamentDay = res.day;

          if (!this.tournamentDay.stadium) {
            this.tournamentDay.stadium = { code: '' }; // O cualquier valor por defecto
          }
  
          // Establecer la sede y el estadio en el formulario
          const sedeId = this.tournamentDay.sede;
          const stadiumId = this.tournamentDay.stadium;
  
          this.dayForm.get('sede')?.setValue(sedeId); // Establecer la sede correctamente 
          this.selectedVenue = sedeId; // Guardar la sede seleccionada
  
          // Llamar a filterStadiums para obtener los estadios de la sede seleccionada
          this.filterStadiums(); 
  
          // Establecer el estadio si existe
          this.dayForm.get('stadium')?.setValue(stadiumId); 
  
          // Asignar horarios seleccionados
          this.selectedTimes = this.tournamentDay.time; 
          this.dayForm.get('time')?.setValue(this.selectedTimes);
        } else {
          this.notifyService.error('No hay día disponible.');
        }
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }
  
  
  filterStadiums() {
    if (this.selectedVenue) {
      this.filteredStadiums = this.stadiums.filter(stadium => stadium.belongToSede === this.selectedVenue);
  
      const stadiumId = this.tournamentDay.stadium;
      if (stadiumId && this.filteredStadiums.some(stadium => stadium._id === stadiumId)) {
        this.dayForm.get('stadium')?.setValue(stadiumId); // Asegúrate de que este ID esté presente
      } else {
        this.dayForm.get('stadium')?.setValue(null); // Limpiar si no está
      }
    } else {
      this.filteredStadiums = [];
      this.dayForm.get('stadium')?.setValue(null); // Limpiar si no hay sede
    }
  }
  
  

  editDayTournament(){
    const formulario = {
      day: this.dayForm.value.day,
      stadium: this.dayForm.value.stadium,
      sede: this.dayForm.value.sede,
      time: this.dayForm.value.time
    }
    this.tournamentServ.editDayTournament(this.id, this.dayId, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        setTimeout(() => {
          window.location.href = `admin/create-day/${this.id}`
        }, 500)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  getStadiums(){
    this.tournamentServ.getEstadios().subscribe({
      next: (res : any) => {
        this.stadiums = res.stadiums;
        this.filterStadiums(); // Filtrar estadios después de cargar
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

  async deleteDayTournament() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar este Dia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario ha cancelado, no hacer nada
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // El usuario ha confirmado, proceder con la eliminación
            this.tournamentServ.deleteDayTournament(this.id, this.dayId).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/admin/create-day/${this.id}`;
                }, 500); 
              },
              error: (err: any) => {
                this.notifyService.error(err.error.message);
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  



}
