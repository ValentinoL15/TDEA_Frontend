import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { Category } from 'src/app/interfaces/Category';
import { Edad } from 'src/app/interfaces/Edad';
import { Format } from 'src/app/interfaces/Format';
import { Sede } from 'src/app/interfaces/Sede';
import { Stadium } from 'src/app/interfaces/Stadium';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home-tournament',
  templateUrl: './home-tournament.page.html',
  styleUrls: ['./home-tournament.page.scss'],
})
export class HomeTournamentPage implements OnInit,OnDestroy   {

  form: FormGroup;
  categories: Category[] = [];
  formats: Format[] = []
  campeonatos: Campeonato[] = []
  edades: Edad[] = []
  tournaments: Tournament[] = []
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
    teamSubscribed: [{
      _id: "",
      preferences: []
    }],
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
      day: {
        type: ""
      },
      sede: {
        images: []
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
      time: []
    }],
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0
  }
  ano:any

  stadiums: Stadium[] = []
  sedes: Sede[] = []
  sedeSeleccionada: string | null = null;
  estadioSeleccionado: number | null = null;
  filteredStadiums: Stadium[][] = [];
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
  selectedFile: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;
  selectedFile4: File | null = null;
  markerPosition: google.maps.LatLngLiteral | null = null;
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: -34.6037, lng: -58.3816 }; 
  currentYear = new Date().getFullYear();

  map: any;
  marker: any;
  address: string = '';


  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      nameFantasy: ['', Validators.required],
      ano: ['', Validators.required],
      rangeAgeSince: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      rangeAgeUntil: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      category: ['', Validators.required],
      format: ['', Validators.required],
      campeonato: ['', Validators.required],
      edad: ['', Validators.required],
      isTournamentActive: ['', Validators.required],
      isTournamentMasculine: ['', Validators.required],
      tournamentDate: ['', Validators.required],
      tournamentNotes: ['', Validators.required],
      ageDescripcion: ['', Validators.required],
      tarifaInscripcion: ['', Validators.required],
      tarifaPartido: ['', Validators.required],
      deposito: ['', Validators.required],
      cupos: ['', Validators.required],
      daysTournament: this.formBuilder.array([]), // Inicializa daysTournament como FormArray
      sedeSeleccionada: [null],
      estadioSeleccionado: [''],
      latitude: [null, Validators.required], // Añadir latitud
      altitude: [null, Validators.required],  // Añadir altitud
      address: new FormControl(''), // Campo para la dirección
    })
  }

  ngOnInit() {
    this.getCategories();
    this.getFormats();
    this.getCampeonatos();
    this.getEdades();
    this.getStadiums();
    this.getSedes();
  
    const message = localStorage.getItem('torneoCreated');
    if (message) {
      this.notifyService.success(message);
      localStorage.removeItem('torneoCreated');
    }
    this.tournamentServ.getTournamentUpdate().subscribe(() => {
      this.getTournaments();
    });
    this.getTournaments();
  }

  private destroyMap() {
    if (this.map) {
      this.map.remove();
      this.map = null!;
    }
  }

  ngOnDestroy() {
    this.destroyMap();
  }

  
isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

getCategories(){
  this.tournamentServ.getCategories().subscribe({
    next: (res : any) => {
      this.categories = res.categories
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getCampeonatos(){
  this.tournamentServ.getCampeonatos().subscribe({
    next: (res : any) => {
      this.campeonatos = res.campeonatos
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getEdades(){
  this.tournamentServ.getEdades().subscribe({
    next: (res : any) => {
      this.edades = res.edades
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getStadiums() {
  this.tournamentServ.getEstadios().subscribe({
    next: (res: any) => {
      this.stadiums = res.stadiums; // Guardar todos los estadios
      this.stadiums = [...this.stadiums]; // Inicialmente, mostrar todos los estadios
    },
    error: (err) => {
      this.notifyService.error(err.error.message);
    }
  });
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

getFormats(){
  this.tournamentServ.getFormats().subscribe({
    next: (res : any) => {
      this.formats = res.formats
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

addDayTournament() {
  const dayGroup = new FormGroup({
    day: new FormControl(''),
    sedeSeleccionada: new FormControl(''),  // Control para la sede
    estadioSeleccionado: new FormControl(''),  // Control para el estadio
    time: new FormControl('') // Control para el horario
  });

  this.daysTournament.push(dayGroup); // Agrega el nuevo FormGroup al FormArray
  this.filteredStadiums.push([]); // Inicializa el arreglo de estadios filtrados para este día
}

// Getter para facilitar el acceso al FormArray
get daysTournament(): FormArray {
  return this.form.get('daysTournament') as FormArray;
}

removeDayTournament(index: number) {
  this.daysTournament.removeAt(index);
  this.filteredStadiums.splice(index, 1); // Elimina el arreglo de estadios filtrados correspondiente
}


createTournament() {
  if (this.form.get('rangeAgeUntil')?.value < this.form.get('rangeAgeSince')?.value) {
    return this.notifyService.error('El rango de edad debe ser válido');
  }

  // Asegúrate de que 'stadium' siempre tenga un valor, si no, asignar 'A definir'
  const daysTournament = this.form.value.daysTournament.map((dayTournament: any) => ({
    day: dayTournament.day,
    sede: dayTournament.sedeSeleccionada,
    stadium: dayTournament.estadioSeleccionado, // Asignar 'A definir' si el estadio está vacío
    time: dayTournament.time // Suponiendo que "time" ya es un array de strings
  }));

  const formData = new FormData();
  formData.append('nameFantasy', this.form.get('nameFantasy')?.value || '');
  formData.append('ano', this.form.get('ano')?.value || '');
  formData.append('rangeAgeSince', this.form.get('rangeAgeSince')?.value || '');
  formData.append('rangeAgeUntil', this.form.get('rangeAgeUntil')?.value || '');
  formData.append('category', this.form.get('category')?.value || '');
  formData.append('format', this.form.get('format')?.value || '');
  formData.append('campeonato', this.form.get('campeonato')?.value || '');
  formData.append('edad', this.form.get('edad')?.value || '');
  formData.append('isTournamentActive', this.form.get('isTournamentActive')?.value || false);
  formData.append('isTournamentMasculine', this.form.get('isTournamentMasculine')?.value || false);
  formData.append('tournamentDate', this.form.get('tournamentDate')?.value || '');
  formData.append('tournamentNotes', this.form.get('tournamentNotes')?.value || '');
  formData.append('ageDescripcion', this.form.get('ageDescripcion')?.value || '');
  formData.append('tarifaInscripcion', this.form.get('tarifaInscripcion')?.value || '');
  formData.append('tarifaPartido', this.form.get('tarifaPartido')?.value || '');
  formData.append('deposito', this.form.get('deposito')?.value || '');
  formData.append('cupos', this.form.get('cupos')?.value || '');
  formData.append('image1', this.selectedFile as Blob);
  formData.append('image2', this.selectedFile2 as Blob);
  formData.append('image3', this.selectedFile3 as Blob);
  formData.append('reglamentation', this.selectedFile4 as Blob);
  // Agregar los días del torneo al FormData como un JSON string
  formData.append('daysTournament', JSON.stringify(daysTournament));
  formData.append('latitude', this.form.get('latitude')?.value);
  formData.append('altitude', this.form.get('altitude')?.value);

if (this.form.get('latitude')?.value === '' || this.form.get('altitude')?.value === '') {
  return this.notifyService.error('Debes seleccionar una ubicación para el torneo.');
}



  this.tournamentServ.createTournament(formData).subscribe({
    next: (res: any) => {
      localStorage.setItem('torneoCreated', res.message);
      window.location.href = '/admin/home-tournament';
    },
    error: (err) => {
      this.notifyService.error(err.error.message);
    }
  });
}

getTournaments(){
  this.tournamentServ.getMyTournaments().subscribe({
    next: (res : any) => {
      this.tournaments = res.tournaments
      //this.tournaments = res.tournaments.sort((a:any, b:any) => a.order - b.order);
      console.log(this.tournaments);
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile = file;
}

onFileSelected2(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile2 = file;
}

onFileSelected3(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile3 = file;
}

onFileSelected4(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile4 = file;
}

drop(event: CdkDragDrop<any[]>): void {
  // Cambiar el orden en la lista local
  moveItemInArray(this.tournaments, event.previousIndex, event.currentIndex);

  // Confirmar el cambio en el servidor
  this.tournamentServ.updateTournamentOrder(this.tournaments.map(t => t._id)).subscribe({
    next: (res: any) => {
      console.log('Orden actualizado:', res);
    },
    error: (err) => {
      this.notifyService.error('Error al actualizar el orden');
      console.error('Error:', err);
    }
  });
}


goTournament(id:any){
  this.router.navigate([`/admin/tournaments/${id}`])
}

limitLength(event: any) {
  const input = event.target;
  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4);
  }
}

onSedeChange(index: number) {
  const dayGroup = this.daysTournament.at(index) as FormGroup;
  const sedeId = dayGroup.get('sedeSeleccionada')?.value;

  // Filtrar los estadios según la sede seleccionada
  this.filteredStadiums[index] = this.stadiums.filter(stadium => stadium.belongToSede === sedeId);

  // Reiniciar el estadio seleccionado
  dayGroup.get('estadioSeleccionado')?.setValue(null);

  // Validación del control de estadio
  if (this.filteredStadiums[index].length > 0) {
    dayGroup.get('estadioSeleccionado')?.setValidators(Validators.required);
  } else {
    dayGroup.get('estadioSeleccionado')?.clearValidators();
  }

  dayGroup.get('estadioSeleccionado')?.updateValueAndValidity();
}


}
