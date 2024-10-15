import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Schedule } from 'src/app/interfaces/Schedule';
import { Stadium } from 'src/app/interfaces/Stadium';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-edit-horarios',
  templateUrl: './edit-horarios.page.html',
  styleUrls: ['./edit-horarios.page.scss'],
})
export class EditHorariosPage implements OnInit {

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController ) { }

id:any
horario: Schedule = {
  _id: "",
  belongDay: "" ,
  times: [],
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
  }
}
stadiums: Stadium[] = []
newTime: string = '';  // Variable para almacenar el horario nuevo
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
selectedTimes: string[] = []; 

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getSchedule(this.id)
  this.getEstadios()
}

removeTime(index: number) {
  this.times.splice(index, 1);  // Elimina el horario seleccionado
}

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}


volver(){
  this.router.navigate([`/admin/day/${this.horario.belongDay}`])
}

getSchedule(id : any){
  this.tournamentServ.getSchedule(id).subscribe({
    next: (res : any) => {
      this.horario = res.horario
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
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

editSchedule(form : any){
  const formulario = {
    times: this.selectedTimes,
  }
  this.tournamentServ.editSchedules(this.id,formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      //this.getSchedule(this.id)
      //this.setOpen(false)
      //this.removeTime(form)
      //this.selectedTimes = []
      window.location.href = `/admin/edit-horarios/${this.id}`
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

onTimeChange(event: any) {
  // Actualiza selectedTimes cuando el usuario selecciona horarios
  this.selectedTimes = event.detail.value;
}

eliminarHora(time : any){
  const formulario = {
    times: time
  }
  console.log(formulario)
  this.tournamentServ.deleteHour(this.id,formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getSchedule(this.id)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

eliminarSchedule(){
  this.tournamentServ.deleteSchedule(this.id).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      setTimeout(() => {
        window.location.href = `/day/${this.horario.belongDay}`
      }, 500)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}


}
