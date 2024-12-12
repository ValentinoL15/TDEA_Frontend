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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required], [this.validateEmailAsync]],
      phone: ['+54', Validators.required],
      instagram: ['', Validators.required],
      nacimiento: ['', Validators.required]
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

  validateEmailAsync: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return new Promise(resolve => {
        setTimeout(() => { // Simular una solicitud asíncrona (puedes omitir esto si tu validación no requiere un retraso)
          resolve(valid ? null : { invalidEmail: true });
        }, 1000); // Tiempo de espera simulado de 1 segundo
      });
    };

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
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.errors);
      this.notifyService.error('Por favor, completa todos los campos requeridos.');
      return;
    }
    if(this.form.valid){
          const phoneNumberValue = this.form.value.phone;
    
          let phoneNumber;
          try {
            phoneNumber = parsePhoneNumber(phoneNumberValue, 'AR'); // 'AR' es el código de país para Argentina
            
            if (phoneNumber && phoneNumber.isValid()) {
              console.log('Número de teléfono válido:', phoneNumber.number); // Número formateado
            } else {
              console.error('Número de teléfono inválido');
              this.notifyService.error('Número de teléfono inválido, el número debe ser con formato: +54-1111-123456');
              return; // Salir de la función si el número no es válido
            }
          } catch (error) {
            console.error('Error al parsear el número de teléfono:', error);
            this.notifyService.error('Error al validar el número de teléfono');
            return; // Salir de la función si ocurre un error
          }

    const formulario = {
      nombre : this.form.value.nombre,
      email : this.form.value.email,
      apellido: this.form.value.apellido,
      instagram: this.form.value.instagram,
      phone: this.form.value.phone,
      nacimiento: this.form.value.nacimiento
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