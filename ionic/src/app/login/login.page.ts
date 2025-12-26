import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormBuilder , Validators, AsyncValidatorFn, AbstractControl, ValidationErrors , ValidatorFn} from '@angular/forms';
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
  imagePreview: string | ArrayBuffer | null = null;


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
      confirmEmail: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['+54', [Validators.required]],
      isPlayer: ['', [Validators.required]]
    },{
      validators: this.passwordsMatchValidator
    }
  )
  }

countries = [
  { name: 'Afganistán', code: 'AF', dial: '+93' },
  { name: 'Albania', code: 'AL', dial: '+355' },
  { name: 'Alemania', code: 'DE', dial: '+49' },
  { name: 'Andorra', code: 'AD', dial: '+376' },
  { name: 'Angola', code: 'AO', dial: '+244' },
  { name: 'Antigua y Barbuda', code: 'AG', dial: '+1-268' },
  { name: 'Arabia Saudita', code: 'SA', dial: '+966' },
  { name: 'Argelia', code: 'DZ', dial: '+213' },
  { name: 'Argentina', code: 'AR', dial: '+54' },
  { name: 'Armenia', code: 'AM', dial: '+374' },
  { name: 'Australia', code: 'AU', dial: '+61' },
  { name: 'Austria', code: 'AT', dial: '+43' },
  { name: 'Azerbaiyán', code: 'AZ', dial: '+994' },
  { name: 'Bahamas', code: 'BS', dial: '+1-242' },
  { name: 'Bangladés', code: 'BD', dial: '+880' },
  { name: 'Barbados', code: 'BB', dial: '+1-246' },
  { name: 'Baréin', code: 'BH', dial: '+973' },
  { name: 'Bélgica', code: 'BE', dial: '+32' },
  { name: 'Belice', code: 'BZ', dial: '+501' },
  { name: 'Benín', code: 'BJ', dial: '+229' },
  { name: 'Bielorrusia', code: 'BY', dial: '+375' },
  { name: 'Bolivia', code: 'BO', dial: '+591' },
  { name: 'Bosnia y Herzegovina', code: 'BA', dial: '+387' },
  { name: 'Botsuana', code: 'BW', dial: '+267' },
  { name: 'Brasil', code: 'BR', dial: '+55' },
  { name: 'Brunéi', code: 'BN', dial: '+673' },
  { name: 'Bulgaria', code: 'BG', dial: '+359' },
  { name: 'Burkina Faso', code: 'BF', dial: '+226' },
  { name: 'Burundi', code: 'BI', dial: '+257' },
  { name: 'Bután', code: 'BT', dial: '+975' },
  { name: 'Cabo Verde', code: 'CV', dial: '+238' },
  { name: 'Camboya', code: 'KH', dial: '+855' },
  { name: 'Camerún', code: 'CM', dial: '+237' },
  { name: 'Canadá', code: 'CA', dial: '+1' },
  { name: 'Catar', code: 'QA', dial: '+974' },
  { name: 'Chad', code: 'TD', dial: '+235' },
  { name: 'Chile', code: 'CL', dial: '+56' },
  { name: 'China', code: 'CN', dial: '+86' },
  { name: 'Chipre', code: 'CY', dial: '+357' },
  { name: 'Colombia', code: 'CO', dial: '+57' },
  { name: 'Comoras', code: 'KM', dial: '+269' },
  { name: 'Corea del Norte', code: 'KP', dial: '+850' },
  { name: 'Corea del Sur', code: 'KR', dial: '+82' },
  { name: 'Costa de Marfil', code: 'CI', dial: '+225' },
  { name: 'Costa Rica', code: 'CR', dial: '+506' },
  { name: 'Croacia', code: 'HR', dial: '+385' },
  { name: 'Cuba', code: 'CU', dial: '+53' },
  { name: 'Dinamarca', code: 'DK', dial: '+45' },
  { name: 'Dominica', code: 'DM', dial: '+1-767' },
  { name: 'Ecuador', code: 'EC', dial: '+593' },
  { name: 'Egipto', code: 'EG', dial: '+20' },
  { name: 'El Salvador', code: 'SV', dial: '+503' },
  { name: 'Emiratos Árabes Unidos', code: 'AE', dial: '+971' },
  { name: 'Eritrea', code: 'ER', dial: '+291' },
  { name: 'Eslovaquia', code: 'SK', dial: '+421' },
  { name: 'Eslovenia', code: 'SI', dial: '+386' },
  { name: 'España', code: 'ES', dial: '+34' },
  { name: 'Estados Unidos', code: 'US', dial: '+1' },
  { name: 'Estonia', code: 'EE', dial: '+372' },
  { name: 'Etiopía', code: 'ET', dial: '+251' },
  { name: 'Filipinas', code: 'PH', dial: '+63' },
  { name: 'Finlandia', code: 'FI', dial: '+358' },
  { name: 'Fiyi', code: 'FJ', dial: '+679' },
  { name: 'Francia', code: 'FR', dial: '+33' },
  { name: 'Gabón', code: 'GA', dial: '+241' },
  { name: 'Gambia', code: 'GM', dial: '+220' },
  { name: 'Georgia', code: 'GE', dial: '+995' },
  { name: 'Ghana', code: 'GH', dial: '+233' },
  { name: 'Granada', code: 'GD', dial: '+1-473' },
  { name: 'Grecia', code: 'GR', dial: '+30' },
  { name: 'Guatemala', code: 'GT', dial: '+502' },
  { name: 'Guinea', code: 'GN', dial: '+224' },
  { name: 'Guinea Ecuatorial', code: 'GQ', dial: '+240' },
  { name: 'Guinea-Bisáu', code: 'GW', dial: '+245' },
  { name: 'Guyana', code: 'GY', dial: '+592' },
  { name: 'Haití', code: 'HT', dial: '+509' },
  { name: 'Honduras', code: 'HN', dial: '+504' },
  { name: 'Hungría', code: 'HU', dial: '+36' },
  { name: 'India', code: 'IN', dial: '+91' },
  { name: 'Indonesia', code: 'ID', dial: '+62' },
  { name: 'Irak', code: 'IQ', dial: '+964' },
  { name: 'Irán', code: 'IR', dial: '+98' },
  { name: 'Irlanda', code: 'IE', dial: '+353' },
  { name: 'Islandia', code: 'IS', dial: '+354' },
  { name: 'Israel', code: 'IL', dial: '+972' },
  { name: 'Italia', code: 'IT', dial: '+39' },
  { name: 'Jamaica', code: 'JM', dial: '+1-876' },
  { name: 'Japón', code: 'JP', dial: '+81' },
  { name: 'Jordania', code: 'JO', dial: '+962' },
  { name: 'Kazajistán', code: 'KZ', dial: '+7' },
  { name: 'Kenia', code: 'KE', dial: '+254' },
  { name: 'Kirguistán', code: 'KG', dial: '+996' },
  { name: 'Kiribati', code: 'KI', dial: '+686' },
  { name: 'Kuwait', code: 'KW', dial: '+965' },
  { name: 'Laos', code: 'LA', dial: '+856' },
  { name: 'Lesoto', code: 'LS', dial: '+266' },
  { name: 'Letonia', code: 'LV', dial: '+371' },
  { name: 'Líbano', code: 'LB', dial: '+961' },
  { name: 'Liberia', code: 'LR', dial: '+231' },
  { name: 'Libia', code: 'LY', dial: '+218' },
  { name: 'Liechtenstein', code: 'LI', dial: '+423' },
  { name: 'Lituania', code: 'LT', dial: '+370' },
  { name: 'Luxemburgo', code: 'LU', dial: '+352' },
  { name: 'Macedonia del Norte', code: 'MK', dial: '+389' },
  { name: 'Madagascar', code: 'MG', dial: '+261' },
  { name: 'Malasia', code: 'MY', dial: '+60' },
  { name: 'Malaui', code: 'MW', dial: '+265' },
  { name: 'Maldivas', code: 'MV', dial: '+960' },
  { name: 'Malí', code: 'ML', dial: '+223' },
  { name: 'Malta', code: 'MT', dial: '+356' },
  { name: 'Marruecos', code: 'MA', dial: '+212' },
  { name: 'Mauricio', code: 'MU', dial: '+230' },
  { name: 'Mauritania', code: 'MR', dial: '+222' },
  { name: 'México', code: 'MX', dial: '+52' },
  { name: 'Micronesia', code: 'FM', dial: '+691' },
  { name: 'Moldavia', code: 'MD', dial: '+373' },
  { name: 'Mónaco', code: 'MC', dial: '+377' },
  { name: 'Mongolia', code: 'MN', dial: '+976' },
  { name: 'Montenegro', code: 'ME', dial: '+382' },
  { name: 'Mozambique', code: 'MZ', dial: '+258' },
  { name: 'Namibia', code: 'NA', dial: '+264' },
  { name: 'Nauru', code: 'NR', dial: '+674' },
  { name: 'Nepal', code: 'NP', dial: '+977' },
  { name: 'Nicaragua', code: 'NI', dial: '+505' },
  { name: 'Níger', code: 'NE', dial: '+227' },
  { name: 'Nigeria', code: 'NG', dial: '+234' },
  { name: 'Noruega', code: 'NO', dial: '+47' },
  { name: 'Nueva Zelanda', code: 'NZ', dial: '+64' },
  { name: 'Omán', code: 'OM', dial: '+968' },
  { name: 'Países Bajos', code: 'NL', dial: '+31' },
  { name: 'Pakistán', code: 'PK', dial: '+92' },
  { name: 'Palaos', code: 'PW', dial: '+680' },
  { name: 'Panamá', code: 'PA', dial: '+507' },
  { name: 'Papúa Nueva Guinea', code: 'PG', dial: '+675' },
  { name: 'Paraguay', code: 'PY', dial: '+595' },
  { name: 'Perú', code: 'PE', dial: '+51' },
  { name: 'Polonia', code: 'PL', dial: '+48' },
  { name: 'Portugal', code: 'PT', dial: '+351' },
  { name: 'Reino Unido', code: 'GB', dial: '+44' },
  { name: 'República Centroafricana', code: 'CF', dial: '+236' },
  { name: 'República Checa', code: 'CZ', dial: '+420' },
  { name: 'República del Congo', code: 'CG', dial: '+242' },
  { name: 'República Democrática del Congo', code: 'CD', dial: '+243' },
  { name: 'República Dominicana', code: 'DO', dial: '+1-809' },
  { name: 'Ruanda', code: 'RW', dial: '+250' },
  { name: 'Rumania', code: 'RO', dial: '+40' },
  { name: 'Rusia', code: 'RU', dial: '+7' },
  { name: 'Samoa', code: 'WS', dial: '+685' },
  { name: 'San Cristóbal y Nieves', code: 'KN', dial: '+1-869' },
  { name: 'San Marino', code: 'SM', dial: '+378' },
  { name: 'San Vicente y las Granadinas', code: 'VC', dial: '+1-784' },
  { name: 'Santa Lucía', code: 'LC', dial: '+1-758' },
  { name: 'Santo Tomé y Príncipe', code: 'ST', dial: '+239' },
  { name: 'Senegal', code: 'SN', dial: '+221' },
  { name: 'Serbia', code: 'RS', dial: '+381' },
  { name: 'Seychelles', code: 'SC', dial: '+248' },
  { name: 'Sierra Leona', code: 'SL', dial: '+232' },
  { name: 'Singapur', code: 'SG', dial: '+65' },
  { name: 'Siria', code: 'SY', dial: '+963' },
  { name: 'Somalia', code: 'SO', dial: '+252' },
  { name: 'Sri Lanka', code: 'LK', dial: '+94' },
  { name: 'Sudáfrica', code: 'ZA', dial: '+27' },
  { name: 'Sudán', code: 'SD', dial: '+249' },
  { name: 'Sudán del Sur', code: 'SS', dial: '+211' },
  { name: 'Suecia', code: 'SE', dial: '+46' },
  { name: 'Suiza', code: 'CH', dial: '+41' },
  { name: 'Surinam', code: 'SR', dial: '+597' },
  { name: 'Tailandia', code: 'TH', dial: '+66' },
  { name: 'Taiwán', code: 'TW', dial: '+886' },
  { name: 'Tanzania', code: 'TZ', dial: '+255' },
  { name: 'Tayikistán', code: 'TJ', dial: '+992' },
  { name: 'Timor Oriental', code: 'TL', dial: '+670' },
  { name: 'Togo', code: 'TG', dial: '+228' },
  { name: 'Tonga', code: 'TO', dial: '+676' },
  { name: 'Trinidad y Tobago', code: 'TT', dial: '+1-868' },
  { name: 'Túnez', code: 'TN', dial: '+216' },
  { name: 'Turquía', code: 'TR', dial: '+90' },
  { name: 'Turkmenistán', code: 'TM', dial: '+993' },
  { name: 'Tuvalu', code: 'TV', dial: '+688' },
  { name: 'Ucrania', code: 'UA', dial: '+380' },
  { name: 'Uganda', code: 'UG', dial: '+256' },
  { name: 'Uruguay', code: 'UY', dial: '+598' },
  { name: 'Uzbekistán', code: 'UZ', dial: '+998' },
  { name: 'Vanuatu', code: 'VU', dial: '+678' },
  { name: 'Vaticano', code: 'VA', dial: '+379' },
  { name: 'Venezuela', code: 'VE', dial: '+58' },
  { name: 'Vietnam', code: 'VN', dial: '+84' },
  { name: 'Yemen', code: 'YE', dial: '+967' },
  { name: 'Yibuti', code: 'DJ', dial: '+253' },
  { name: 'Zambia', code: 'ZM', dial: '+260' },
  { name: 'Zimbabue', code: 'ZW', dial: '+263' }
];

passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email')?.value;
  const confirmEmail = control.get('confirmEmail')?.value;

  // Solo comparamos si ambos tienen valor
  if (!email || !confirmEmail) return null;

  return email === confirmEmail ? null : { mismatch: true };
};


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
        if (role?.rol.includes("USER")) {
          this.router.navigate(['/user/home']);
          this.notifyService.success(res.message);
        } else {
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

  selectedCountryCode = 'AR';

get selectedCountry() {
  return this.countries.find(c => c.code === this.selectedCountryCode)!;
}

onCountryChange(code: string) {
  this.selectedCountryCode = code;

  this.register.get('phone')?.setValue(
    this.selectedCountry.dial + ' ',
    { emitEvent: false }
  );
}

onPhoneInputChange(event: any) {
  const value = event.detail.value || '';
  const dial = this.selectedCountry.dial;

  const numbersOnly = value.replace(dial, '').replace(/\D/g, '');

  this.register.get('phone')?.setValue(
    dial + ' ' + numbersOnly,
    { emitEvent: false }
  );
}


  registerFormSubmit(){
    /*if(this.register.valid){
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
      }*/

    // ERROR: Emails no coinciden (Validador de Grupo)
    if (this.register.hasError('mismatch')) {
      this.notifyService.error('Los correos electrónicos no coinciden.');
      return;
    }

    // ERROR: Email con formato incorrecto (Validador Asíncrono)
    if (this.register.get('email')?.hasError('invalidEmail')) {
      this.notifyService.error('El formato del correo electrónico es inválido.');
      return;
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
          localStorage.setItem('isFirstTime', 'true');
        },
        error: err => {
          this.notifyService.error(err.error.message)
        }
      })
    /*}*/
    }

    onFileSelected(event: Event) {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          // Asegurar que `e?.target?.result` sea un string válido
          this.imagePreview = e?.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = null; // Limpiar la vista previa si no se selecciona ningún archivo
      }
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

  }

