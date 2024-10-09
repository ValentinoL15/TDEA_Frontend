import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsePhoneNumber } from 'libphonenumber-js';
import { User } from 'src/app/interfaces/User';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-users',
  templateUrl: './my-users.page.html',
  styleUrls: ['./my-users.page.scss'],
})
export class MyUsersPage implements OnInit {

form: FormGroup
users: User[] = []

constructor(private userService: UserService, private notifyService: NotifyService, private router: Router, private fb: FormBuilder) { 
  this.form = this.fb.group({
    docNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    gender:['', [Validators.required]],
    email: ['', [Validators.required], [this.validateEmailAsync] ],
    password: ['', [Validators.required]],
    phone: ['+54', [Validators.required]],
    rol: ['', Validators.required]
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
  this.getUsuarios()
}

getUsuarios(){
  this.userService.getUsers().subscribe({
    next: (res : any) => {
      this.users = res.users
      this.users = this.users.sort((a:any,b:any) => a.order - b.order)
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

goUser(id:any){
  this.router.navigate([`/admin-users/${id}`, ])
}

volver(){
  this.router.navigate(['/admin/admin-home'])
}

isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  createAdmin(){
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
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        docNumber: this.form.value.docNumber,
        email: this.form.value.email,
        password: this.form.value.password,
        rol: this.form.value.rol,
        gender: this.form.value.gender,
        phone: this.form.value.phone
      }
      this.userService.createAdmin(formulario).subscribe({
        next: (res : any) => {
          this.notifyService.success(res.message)
          this.form.reset()
          this.getUsuarios()
        },
        error: (err: any) => {
          this.notifyService.error(err.error.message)
        }
      })
    }
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
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);

    // Enviar el nuevo orden de usuarios al backend
    this.userService.updateUsersOrder(this.users.map(u => u._id)).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err) => {
        this.notifyService.error('Error al actualizar el orden de usuarios');
        console.error(err);
      }
    });
  }
  

}
