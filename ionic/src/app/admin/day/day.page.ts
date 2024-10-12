import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from 'src/app/interfaces/Day';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Schedule } from 'src/app/interfaces/Schedule';
import { AlertController } from '@ionic/angular';
import { Stadium } from 'src/app/interfaces/Stadium';
import { Sede } from 'src/app/interfaces/Sede';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  id:any

  sede: Sede = {
    belongToEmpresa: "",
    name : "",
    alias: "",
    status: "",
    phone: 0,
    celular: 0,
    adress: "",
    barrio: "",
    socialRed: "",
    daysAttention: [
      {
        day: "",
        start: "",
        end: ""
      },
    ],
    encargado: "",
    dueno: "",
    stadiums: []
  }

  dia: Day = {
    day: "",
    sede: {
      name: "",
    alias: "",
    status: "",
    phone: 0,
    celular: 0,
    adress: "",
    barrio: "",
    socialRed: "",
    daysAttention: [{
        day: "" ,     // Día de la semana (Lunes, Martes, etc.)
        start: "",  // Hora de apertura
        end: ""    // Hora de cierre
    }],
    encargado: "",
    dueno: "",
    },
    horarios: {
      times: [],
      stadium: [{
        code: "",
            type: 0,
            length: 0,
            width: 0,
            roof: "",
            grass: "",
            punctuaction: 0,
      }]
    },
  }
  horarios: Schedule[] = []
  newTime: string = '';  // Variable para almacenar el horario nuevo
  selectedTimes: string[] = []; 
  stadiums: Stadium[] = [];
  sedes: Sede[] = [];
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

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getDay(this.id)
    this.getHorarios()
    this.getEstadios()
    this.getSedes()
  }

  goSchedule(id : any){
    this.router.navigate([`edit-horarios/${id}`])
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(id:any){
    this.router.navigate([`/create-day/${this.dia.belongTournament}`])
  }

  getSede(){
    this.tournamentServ.getSede(this.id).subscribe({

    })
  }

  getDay(id:any){
    this.tournamentServ.getDay(id).subscribe({
      next: (res : any) => {
        this.dia = res.day
        console.log(",i dia" ,this.dia)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getHorarios() {
    this.tournamentServ.getSchedules(this.id).subscribe({
      next: (res: any) => {
        this.horarios = res.horarios
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  getEstadios(){
    this.tournamentServ.getEstadios().subscribe({
      next: (res: any) => {
        this.stadiums = res.stadiums
        console.log(this.stadiums)
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  getSedes(){
    this.tournamentServ.getMySedes().subscribe({
      next: (res : any) => {
        console.log(res)
        this.sedes = res.mySedes
        console.log("Mi sedes:" ,this.sedes)
      },
      error: (err : any)=> {
        this.notifyService.error(err.error.message)
      }
    })
  }

  onSedeChange(event: any) {
    const selectedSedeId = event.detail.value;
    const selectedSede = this.sedes.find(sede => sede._id === selectedSedeId);
    
    if (selectedSede && Array.isArray(selectedSede.stadiums)) {
      this.stadiums = selectedSede.stadiums;
      console.log('Estadios:', this.stadiums); // Verifica que los estadios tienen el campo "code"
    } else {
      this.stadiums = [];
    }
  }

  crearHorario(form:any){
    const formulario = {
    times: this.selectedTimes,
    stadium: form.stadium.value
    }
    console.log(formulario)
    this.tournamentServ.createSchedule(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getDay(this.id),
        this.getHorarios()
        this.setOpen(false)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  isFormValid(form: any): boolean {
    // Verifica que ambos campos tengan exactamente dos dígitos
    const hourValid = form.hour.value.length === 2;
    const minuteValid = form.minute.value.length === 2;
    return hourValid && minuteValid;
  }

  async deleteDay(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar este dia con sus horarios y estadios asociados?',
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
            this.tournamentServ.deleteDay(id).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/create-day/${this.dia.belongTournament}`;
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
