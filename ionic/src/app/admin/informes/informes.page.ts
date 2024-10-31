import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

tournaments: Tournament[] = []
selectedTournament: any = null;  // Torneo seleccionado
skip: number = 0;  // Comienza desde 0
limit: number = 15; // Limite de 10 torneos
currentPage: number = 1; // Página actual
totalTournaments: number = 0; // Total de torneos (opcional, para mostrar más información)
totalPages: number = 0
filterType: string = 'torneo'; // Por defecto, filtrar por torneo
filterValue: string = ''; // Valor ingresado en el input
pages: number[] = []; // Para almacenar los números de páginas

constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router) { }

ngOnInit() {
  this.getTournaments()
}

getTournaments(skip: number = this.skip, limit: number = this.limit, year?: number, torneo?: string, dia?:string, formato?:string, edad?:string) {
  this.tournamentServ.getTournaments(skip, limit, year, torneo, dia, formato,edad).subscribe({
    next: (res: any) => {
      this.tournaments = res.tournaments;
      this.totalTournaments = res.total; // Asumiendo que tu API devuelve el total de torneos
      this.calculatePages(); // Calcular las páginas
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
}

onFilterChange() {
  this.skip = 0; // Reiniciar la paginación
  this.currentPage = 1; // Volver a la primera página

  // Inicializar los parámetros
  let year: number | undefined;
  let torneo: string | undefined;
  let dia: string | undefined;
  let formato: string | undefined; // Cambiado a string
  let edad: string | undefined;

  // Determinar el tipo de filtro y asignar el valor correspondiente
  if (this.filterType === 'torneo') {
      torneo = this.filterValue; // Filtrar por torneo
  } else if (this.filterType === 'ano') {
      year = +this.filterValue; // Filtrar por año
  } else if (this.filterType === 'dia') {
      dia = this.filterValue; // Filtrar por día
  } else if (this.filterType === 'formato') {
      formato = this.filterValue; // Filtrar por formato
  } else if(this.filterType === 'edad'){
      edad = this.filterValue; // Filtrar por edad
  }

  // Llamar a getTournaments con los parámetros correspondientes
  this.getTournaments(this.skip, this.limit, year, torneo, dia, formato, edad);
}





calculatePages() {
  this.totalPages = Math.ceil(this.totalTournaments / this.limit);
  this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1); // Crear un array de páginas
}

nextPage() {
  this.skip += this.limit; // Aumenta el skip
  this.currentPage++;
  this.getTournaments();
}

prevPage() {
  if (this.skip > 0) {
    this.skip -= this.limit; // Disminuye el skip
    this.currentPage--;
    this.getTournaments();
  }
}

goToPage(page: number) {
  this.currentPage = page;
  this.skip = (page - 1) * this.limit;
  this.getTournaments();
}

changePage(page: number) {
  this.skip = (page - 1) * this.limit;
  this.getTournaments();
}


getDays(tournament: Tournament): string {
  return tournament.daysTournament?.map(day => day.day).join(', ') || '';
}

getTeamsSubscribed(tournament: Tournament): number {
  return tournament.teamSubscribed?.length || 0
}


goTournament(id:any){
  this.router.navigate([`/informes-info/${id}`])
}

isModalOpen = false;

setOpen(isOpen: boolean, torneo?: any) {
  this.isModalOpen = isOpen;
  if (isOpen) {
    this.selectedTournament = torneo;  // Guarda el torneo actual al abrir el modal
  } else {
    this.selectedTournament = null;  // Restablece el torneo al cerrar el modal
  }
}
}
