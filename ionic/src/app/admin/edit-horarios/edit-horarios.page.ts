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
times: string[] = [];  // Array para almacenar los horarios seleccionados
newTime: string = '';  // Variable para almacenar el horario nuevo

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getSchedule(this.id)
  this.getEstadios()
}

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

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}


volver(){
  this.router.navigate([`/day/${this.horario.belongDay}`])
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
    times: this.times,
  }
  this.tournamentServ.editSchedules(this.id,formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getSchedule(this.id)
      this.setOpen(false)
      this.removeTime(form)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
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
