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
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { parsePhoneNumber } from 'libphonenumber-js';


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


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  form: FormGroup
  phoneNumber: any

  constructor(private router:Router, private userService : UserService, private route: ActivatedRoute, private notifyService: NotifyService, private AuthService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      horarios: ['', Validators.required],
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      peso: ['', Validators.required],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required]
    })
  }
  @ViewChild(IonModal) modal!: IonModal;

  ngOnInit() {
    this.getTeams()
    this.getTeamActive()
    this.getUserEmpty()
    this.userActive()
    this.getUser()
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

  getUser(){
    this.AuthService.getUser().subscribe({
      next: (res : any) => {
        this.user = res.user
        console.log(this.user)
      }
    })
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

  ingresarMarket(){

    const formulario = {
      horarios : this.form.value.horarios,
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
        this.getUser()
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
        this.form.reset()
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