import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { IonModal } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Team } from '../interfaces/Team';
import { NotifyService } from '../services/notify.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PassMarket } from '../interfaces/PassMarket';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id:any
  equipos: Team[] = []
  equipo: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    status: "",
    pictureAccept: false,
    teamImage:"",
    active: false
  }
  equipoSeleccionado: Team | null = null; 
  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    teamImage:"",
    active: false
  }
  user = {
    _id: "",
    completedFormMarket: false
  }
  emptyUser: any = {}
  mercado: PassMarket = {
    _id: "",
    horarios: []
  }
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
    "23:00", "23:15", "23:30", "23:45",
  ];


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  form: FormGroup
  phoneNumber: any

  constructor(private router:Router, private userService : UserService, private route: ActivatedRoute, private notifyService: NotifyService, private AuthService: AuthService, private fb: FormBuilder, private readonly joyrideService: JoyrideService) {
    this.form = this.fb.group({
      horarios: this.fb.array([]),
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[1-9]\\.[0-9]{2}$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required]
    })
  }
  @ViewChild(IonModal) modal!: IonModal;
  

  onClick() {
  const options : JoyrideOptions = {
    steps: ['firstStep']
  }
  this.joyrideService.startTour(options)
}

  ngOnInit() {
    this.getTeams()
    this.getTeamActive()
    this.getUserEmpty()
    this.userActive()
  }
  validateInputAltura(event: any): void {
    let input = event.target.value;
  
    // Eliminar cualquier carácter que no sea número o punto
    input = input.replace(/[^0-9.]/g, '');
  
    // Si solo tiene un número, automáticamente agregar el punto
    if (input.length === 1) {
      input += '.';
    }
  
    // Validar la estructura para tener solo hasta dos números después del punto
    const regex = /^\d(\.\d{0,2})?$/;
  
    if (!regex.test(input)) {
      // Si no pasa la validación, corregir el texto para ajustarse a la estructura X.XX
      const parts = input.split('.');
      if (parts[1]) {
        input = `${parts[0]}.${parts[1].substring(0, 2)}`;
      } else {
        input = parts[0];
      }
    }
  
    // Evitar más de 3 números total (1 antes del punto, 2 después)
    const splitValues = input.split('.');
    if (splitValues[0].length > 1) {
      splitValues[0] = splitValues[0].substring(0, 1);
      input = splitValues.join('.');
    }
  
    // Actualizar el FormControl para la vista
    this.form.get('altura')?.setValue(input, { emitEvent: false });
  
    // Asegurar que el DOM refleje los cambios
    event.target.value = input;
  }
  
  

  validateInput(event: KeyboardEvent) {
    const allowedChars = /^[0-9.]$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
  };

  userActive(){
    this.user = this.AuthService.getUserRole()
    console.log(this.user)
  }

  onEquipoChange(equipoId: any) {
    this.equipoSeleccionado = this.equipos.find(e => e._id === equipoId) || null;
    this.cambiarActivo(equipoId)
  }

  onPhoneInputChange(event: any) {
    let inputValue = event.detail.value;

    // Filtra solo los números después del prefijo +54
    const numericValue = inputValue.replace(/^\+54\s*/, '').replace(/\D/g, '');

    // Mantén el formato deseado, como +54 2477
    let formattedValue = '+54';
    if (numericValue.length > 0) {
      formattedValue += '' + numericValue;
    }

    // Actualiza el valor del campo de teléfono
    const phoneControl = this.form.get('phone');
    phoneControl?.setValue(formattedValue, { emitEvent: false });
  }

  goTeam(id:any){
    this.router.navigate([`/team/${id}`])
  }

  getTeams(){
    this.userService.getTeams().subscribe({
      next: (res : any) => {
        this.equipos = res.teams 
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getTeamActive(){
    this.userService.getTeamActive().subscribe({
      next: (res : any) => {
        this.team = res.team
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getUserEmpty(){
    this.userService.getEmpty().subscribe({
      next: (res : any) => {
        this.emptyUser = res.userEmpty
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cambiarActivo(equipoId : any){
    this.userService.actualizarEquipo(equipoId).subscribe({
      next: (res : any) => {
        window.location.href = `/user/home`
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  addDayTournament() {
    const dayGroup = new FormGroup({
      dia: new FormControl(''),
      hora: new FormControl('')
    });
  
    this.horarios.push(dayGroup); // Agrega el nuevo FormGroup al FormArray
  }

  removeDayTournament(index: number) {
    this.horarios.removeAt(index);
  }

  ingresarMarket(){
    const formulario = {
      horarios: this.form.value.horarios.map((horario: any) => ({
        dia: horario.dia,
        hora: horario.hora
      })),
      peso : this.form.value.peso,
      altura: this.form.value.altura,
      position: this.form.value.position,
      pieHabil: this.form.value.pieHabil,
      trayectoria: this.form.value.trayectoria,
      zona: this.form.value.zona,
    }
    this.userService.ingresarMercado(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.modal.dismiss(null, 'cancel');
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
}

  ir() {
    this.router.navigate(['/create-team']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

}