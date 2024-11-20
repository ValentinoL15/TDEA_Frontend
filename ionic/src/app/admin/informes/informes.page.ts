import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Table } from 'src/app/interfaces/Tables';

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
tournamentFilter: string = '';
yearFilter: string = ''; // Mantenerlo como string para capturar la entrada 
formatFilter: string = '';
ageFilter: string = '';
dayFilter: string = ''; // Nueva propiedad para días
pages: number[] = []; // Para almacenar los números de páginas
tables: Table[] = [];
selectedColumns: string[] = [];  
totalCupos: number = 0;
totalActivos: number = 0;
totalReservados: number = 0;
anotar: number = 0;


constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router) { }

ngOnInit() {
  this.getTournaments()
  this.getTotalsTournaments()
}

getTournaments(skip: number = this.skip, limit: number = this.limit, year?: number[], torneo?: string, dia?: string, formato?: string, edad?: string) {
  this.tournamentServ.getTournaments(skip, limit, year, torneo, dia, formato, edad).subscribe({
      next: (res: any) => {
          this.tournaments = res.tournaments;
          console.log(this.tournaments)
          this.totalTournaments = res.total;
          this.calculatePages();
          this.totalCupos = res.cupos;    // Cupos filtrados
          this.totalActivos = res.activos; // Activos filtrados
          this.totalReservados = res.reservados; // Reservados filtrados
          this.anotar = res.anotar
      },
      error: (err: any) => {
          this.notifyService.error(err.error.message);
      }
  });
}

getTotalsTournaments(){
  this.tournamentServ.getTotals().subscribe({
    next: (res: any) => {
      this.totalCupos = res.cupos;
      this.totalActivos = res.activos
      this.totalReservados = res.reservados
      this.anotar = res.anotar
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  })
}

onFilterChange() {
  this.skip = 0; // Reiniciar la paginación
  this.currentPage = 1; // Volver a la primera página

  // Convertir la cadena de años a un arreglo de números
  let year: number[] | undefined = this.yearFilter
      .split(',')
      .map(y => parseInt(y.trim(), 10))
      .filter(y => !isNaN(y)); // Filtrar años válidos

  let formato: string | undefined = this.formatFilter.length ? this.formatFilter.trim() : undefined;
  let dias: string | undefined = this.dayFilter.trim();

  // Comprobar si todos los filtros están vacíos
  if (!year.length && !this.tournamentFilter && !dias && !formato && !this.ageFilter) {
      // Si todos los filtros están vacíos, traer todos los torneos
      this.getTournaments(); // Llamar sin parámetros
  } else {
      // De lo contrario, aplicar los filtros
      this.getTournaments(
          this.skip,
          this.limit,
          year.length ? year : undefined, // Pasar arreglo de años o undefined
          this.tournamentFilter,
          dias.length ? dias : undefined,
          formato,
          this.ageFilter.length ? this.ageFilter : undefined
      );
  }
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

getReservas(tournament : Tournament): number {
  return tournament.reservados?.length || 0
}

getAnotar(tournament : Tournament){
  const cupos = tournament.cupos || 0
  const activos = tournament.teamSubscribed?.length || 0; 
  const reservados = tournament.reservados?.length || 0
  return cupos - activos - reservados;
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

isModalOpen2 = false
setOpen2(isOpen2:boolean){
  this.isModalOpen2 = isOpen2
}

exportToExcel() {
  // Definir el array de datos para el informe
  const tournamentData: any[] = this.tournaments.map(torneo => ({
    Torneo: torneo.campeonato.type,
    Año: torneo.ano,
    Dias: this.getDays(torneo),
    Formato: torneo.format.formatName,
    Tipo: torneo.edad.type,
    Cupos: torneo.cupos,
    Activos: this.getTeamsSubscribed(torneo),
    Reserva: 'X Jugadores',
    'A anotar': 'X Jugadores'
  }));

  // Agregar una fila para los totales al final del array
  tournamentData.push({
    Torneo: 'Totales',
    Año: '',
    Dias: '',
    Formato: '',
    Tipo: '',
    Cupos: this.totalCupos,
    Activos: this.totalActivos,
    Reserva: '',
    'A anotar': ''
  });

  // Crear la hoja de cálculo
  const excelWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tournamentData);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, excelWorksheet, 'Informe');

  // Generar y guardar el archivo Excel
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'informe_torneos.xlsx');
}



}

// Tipo de archivo Excel
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';




