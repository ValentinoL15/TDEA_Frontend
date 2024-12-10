import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormBuilder , Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Login } from '../interfaces/Login';
import { Sesion } from '../interfaces/Sesion';
import { NotifyService } from '../services/notify.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import parsePhoneNumber from 'libphonenumber-js'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";


  phoneNumber: any

  form: FormGroup;
  register: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private registerForm : FormBuilder, private notifyService: NotifyService, private router: Router, private auth : AuthService) {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.register = this.registerForm.group({
      docNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender:['', [Validators.required]],
      email: ['', [Validators.required], [this.validateEmailAsync] ],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['+54', [Validators.required]],
      isPlayer: ['', [Validators.required]]
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

  goReset(){
    this.router.navigate(['/reset-password'])
  }

  submitForm() {
    const form: Sesion = {
      docNumber: this.form.value.dni,
      password: this.form.value.password
    } 

    this.auth.login(form).subscribe({
      next: (res : any) => {
        localStorage.setItem("st_1892@121", res.token);
        const role = this.auth.getUserRole();
        console.log("Mi role ",role)
        // Verificar si el array de roles incluye "USER"
        if (role?.rol.includes("USER") && role?.isPlayer === false) {
          this.router.navigate(['/user/home']);
          this.notifyService.success(res.message);
        }else if (role?.rol.includes("USER") && role?.isPlayer === true){
          this.router.navigate(['/home-jugador']);
          this.notifyService.success(res.message);
        }else {
          this.router.navigate(['/admin/admin-home']); // Redirige a la página de admin
          this.notifyService.success(res.message);
        }
      },
      error: err => {
        this.notifyService.error(err.error.message);
      }
    })
    
  }

  cancel(){
    const modal = document.querySelector('ion-modal');
    modal?.dismiss(null, 'cancel');
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
    const phoneControl = this.register.get('phone');
    phoneControl?.setValue(formattedValue, { emitEvent: false });
  }


  registerFormSubmit(){
    if(this.register.valid){
      const phoneNumberValue = this.register.value.phone;

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
  
      const formData = new FormData();
      formData.append('firstName', this.register.get('firstName')?.value)
      formData.append('lastName', this.register.get('lastName')?.value)
      formData.append('docNumber', this.register.get('docNumber')?.value)
      formData.append('gender', this.register.get('gender')?.value)
      formData.append('phone', this.register.get('phone')?.value)
      formData.append('birthday', this.register.get('birthday')?.value)
      formData.append('email', this.register.get('email')?.value)
      formData.append('isPlayer', this.register.get('isPlayer')?.value)
      formData.append('password', this.register.get('password')?.value)
      formData.append('image', this.selectedFile as Blob);
      
      this.auth.register(formData).subscribe({
        next: (res : any) => {
          this.notifyService.success(res.message);
          console.log("Mi console log: ", res)
          const modal = document.querySelector('ion-modal');
          modal?.dismiss(this.name, 'confirm');
          this.router.navigate(['/confirm-code/' + res.verificationId])
        },
        error: err => {
          this.notifyService.error(err.error.message)
        }
      })
    }
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.selectedFile = file;
      console.log('Archivo seleccionado:', file);
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

  }

