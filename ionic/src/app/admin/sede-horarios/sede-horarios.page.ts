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
  // Incluir el día seleccionado (selectedDay.day) en las opciones disponibles
  return this.daysDisponibles.filter(d => 
    !this.sede.daysAttention.some(day => day.day.trim().toLowerCase() === d.trim().toLowerCase()) || 
    this.selectedDay.day.trim().toLowerCase() === d.trim().toLowerCase()
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
  const datosHorario = {
    day: this.selectedDay.day,
    start: this.selectedDay.start,
    end: this.selectedDay.end
  };

  this.tournamentServ.actualizarHorario(this.id, datosHorario).subscribe({
    next: (res: any) => {
      this.notifyService.success('Horario actualizado con éxito');
      this.closeModal();
      this.getSede(this.id); // Recargar la sede para ver los cambios
    },
    error: (err: any) => {
      this.notifyService.error('Error al actualizar el horario');
    }
  });
}

isModalOpen = false;

setOpen(day: any) {
  this.selectedDay = { ...day };  // Hacemos una copia del día para editarlo
  this.isModalOpen = true;
  this.filteredDaysDisponibles = this.filterDaysDisponibles();  // Filtrar los días antes de abrir el modal
}

closeModal() {
  this.isModalOpen = false;
}


}


