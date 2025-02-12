import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-sede-horarios',
  templateUrl: './sede-horarios.page.html',
  styleUrls: ['./sede-horarios.page.scss'],
})
export class SedeHorariosPage implements OnInit {

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
  images: [''],
  daysAttention: [
    {
      day: "",
      start: "",
      end: ""
    },
  ],
  encargado: "",
  dueno: ""
}
selectedDay: any = {
  day: "",
  start: "",
  end: ""
};
daysDisponibles = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
filteredDaysDisponibles: string[] = []; 

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getSede(this.id)
}

filterDaysDisponibles(): string[] {
  const filtered = this.daysDisponibles.filter(d => 
    !this.sede.daysAttention.some(day => day.day === d) || 
    this.selectedDay.day === d
  );
  console.log('Días disponibles filtrados:', filtered);
  return filtered;
}

onDayChange(event: any) {
  this.selectedDay.day = event.detail.value;
  console.log('Día seleccionado cambiado a:', this.selectedDay.day);
}

getSede(id : any){
  this.tournamentServ.getSede(id).subscribe({
    next: (res:any) => {
      this.sede = res.sede
      console.log(this.sede)
    },
    error: (err:any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

actualizarHorario() {
  // Verifica que se haya seleccionado un día
  if (!this.selectedDay.day) {
    this.notifyService.error('Por favor selecciona un día.');
    return;
  }

  // Encuentra si el día seleccionado ya existe en daysAttention
  const existingDayIndex = this.sede.daysAttention.findIndex(existingDay => existingDay.day === this.selectedDay.day);

  if (existingDayIndex > -1) {
    // Si el día ya existe, actualiza solo el horario del día existente
    this.sede.daysAttention[existingDayIndex].start = this.selectedDay.start;
    this.sede.daysAttention[existingDayIndex].end = this.selectedDay.end;
  } else {
    // Si el día no existe, busca si hay un día seleccionado que queremos reemplazar
    const dayToReplaceIndex = this.sede.daysAttention.findIndex(existingDay => existingDay.day === this.selectedDay.day);

    if (dayToReplaceIndex > -1) {
      // Si existe un día que va a ser reemplazado, elimínalo
      this.sede.daysAttention.splice(dayToReplaceIndex, 1);
    }
    
    // Agrega el nuevo día
    this.sede.daysAttention.push({
      day: this.selectedDay.day,
      start: this.selectedDay.start,
      end: this.selectedDay.end
    });
  }

  // Envía la actualización al servidor
  this.tournamentServ.actualizarHorario(this.id, { daysAttention: this.sede.daysAttention }).subscribe({
    next: (res: any) => {
      this.notifyService.success('Horario actualizado con éxito');
      this.closeModal();
      this.getSede(this.id);
    },
    error: (err: any) => {
      this.notifyService.error('Error al actualizar el horario');
    }
  });
}


isModalOpen = false;

setOpen(day: any) {
  console.log('Abriendo modal para:', day);
  this.selectedDay = { 
    day: day.day,
    start: day.start,
    end: day.end
  };
  this.isModalOpen = true; 
  this.filteredDaysDisponibles = this.filterDaysDisponibles();
}
closeModal() {
  this.isModalOpen = false;
}


}


