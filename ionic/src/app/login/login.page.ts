import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormBuilder , Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Login } from '../interfaces/Login';
import { Sesion } from '../interfaces/Sesion';
import { NotifyService } from '../services/notify.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  public alertButtons = [];
  public alertInputs = [
    {
      placeholder: 'example@example.com',
      name: 'email',
      type: 'email'
    }
  ];

  form: FormGroup;
  register: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerForm : FormBuilder, private notifyService: NotifyService, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.router.navigate(['/user/home'])
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
      const register: Login = {
        dni: this.register.value.dni,
        name: this.register.value.name,
        gender: this.register.value.gender,
        email: this.register.value.email,
        password: this.register.value.password,
        nacimiento: this.register.value.nacimiento,
        phone: this.register.value.phone
      }
      console.log(register);
    }
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

  }

