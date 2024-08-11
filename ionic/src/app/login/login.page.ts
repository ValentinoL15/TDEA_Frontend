import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormBuilder , Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Login } from '../interfaces/Login';
import { Sesion } from '../interfaces/Sesion';
import { NotifyService } from '../services/notify.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  public alertButtons = [
    {
      text: 'Enviar correo de recuperación',
      role: 'ok',
      handler: (data: any) => {
        console.log('Modal alert ok clicked with input data: ', data);
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'boton-cancelar',
    },
  ];

  public alertInputs = [
    {
      placeholder: 'example@example.com',
      name: 'email',
      type: 'email'
    }
  ];

  form: FormGroup;
  register: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerForm : FormBuilder, private notifyService: NotifyService, private router: Router, private auth : AuthService) {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: ['', [Validators.required]],
    });

    this.register = this.registerForm.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender:['', [Validators.required]],
      email: ['', [Validators.required], [this.validateEmailAsync] ],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      nacimiento: ['', Validators.required],
      phone: ['', Validators.required]
    })
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

  ngOnInit() {
  }

  submitForm() {
    const form: Sesion = {
      email: this.form.value.email,
      password: this.form.value.password
    } 
    this.router.navigate(['/user/home']);
    /*this.auth.login(form).subscribe({
      next: (res : any) => {
        localStorage.setItem("st_1892@121", res.token)
        this.router.navigate(['/user/home']);
        this.notifyService.success(res.message);
      },
      error: err => {
        this.notifyService.error(err.error.message);
      }
    })*/
    
  }

  cancel(){
    const modal = document.querySelector('ion-modal');
    modal?.dismiss(null, 'cancel');
  }

  registerFormSubmit(){
    if(this.register.get('password')?.value !== this.register.get('confirmPassword')?.value) {
      alert("las contraseñas no cinciden")
      return
    }
    if(this.register.valid){
      const form: Login = {
        dni: this.register.value.dni,
        name: this.register.value.name,
        gender: this.register.value.gender,
        email: this.register.value.email,
        password: this.register.value.password,
        nacimiento: this.register.value.nacimiento,
        phone: this.register.value.phone
      }
      console.log(form);
    }

    this.auth.register(this.form).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message);
        const modal = document.querySelector('ion-modal');
        modal?.dismiss(this.name, 'confirm');
        this.router.navigate(['/confirm-code/' + res.id])
      },
      error: err => {
        this.notifyService.error(err.error.message);
      }
    })
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

  }

