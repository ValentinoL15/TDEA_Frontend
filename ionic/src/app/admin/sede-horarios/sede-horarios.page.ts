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
daysDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
filteredDaysDisponibles: string[] = []; 

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getSede(this.id)
}

filterDaysDisponibles(): string[] {
  return this.daysDisponibles.filter(d => 
    !this.sede.daysAttention.some(day => day.day === d) || 
    this.selectedDay.day === d
  );
}

onDayChange(event: any) {
  this.selectedDay.day = event.detail.value;
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
  // Verifica si el día ya existe
  const existingDayIndex = this.sede.daysAttention.findIndex(day => day.day === this.selectedDay.day);

  if (existingDayIndex > -1) {
    // Actualiza el horario si el día ya existe
    this.sede.daysAttention[existingDayIndex] = this.selectedDay;
  } else {
    // Agrega un nuevo día si no existe
    this.sede.daysAttention.push(this.selectedDay);
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
  this.selectedDay = { 
    day: day.day[0] || day.day,  // Asegúrate de que esto sea un string
    start: day.start,
    end: day.end
  };
  console.log("Día seleccionado:", this.selectedDay.day);
  this.isModalOpen = true; // Asegúrate de abrir el modal aquí
  this.filteredDaysDisponibles = this.filterDaysDisponibles();
}
closeModal() {
  this.isModalOpen = false;
}


}


