import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { NotifyService } from '../services/notify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import parsePhoneNumberFromString from 'libphonenumber-js';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(private userService: AuthService, private notifyService: NotifyService, private router: Router, private fb: FormBuilder) { 
    
  }

  usuario: User = {
    _id: "",
    firstName: "",
    lastName: "",
    docNumber: 0,
    gender: "",
    phone:0,
    birthday: "yyyy-mm-dd",
    birthdayFormatted: "",
    profileImg: "",
    instagram: "",
    notes: "",
    email: "",
    password:"",
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userService.getUser().subscribe({
      next: (res : any) => {
        this.usuario = res.user
        if (res.user.birthday) {
          // Formatear la fecha a 'YYYY-MM-DD'
          this.usuario.birthday = new Date(res.user.birthday).toISOString().split('T')[0];
        }
        console.log(this.usuario)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  goUser(){
    this.router.navigate([`/user/profile`])
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
  
    // Actualiza el valor del campo de teléfono en el FormGroup
    const phoneInputElement = document.getElementById('phone') as HTMLInputElement;

    // Establece el nuevo valor
    if (phoneInputElement) {
      phoneInputElement.value = formattedValue;
    }
  }

  editProfile(form : any){
    const phoneNumber = form.phone.value;
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, 'AR');
    
    if (!phoneNumberObject || !phoneNumberObject.isValid()) {
      this.notifyService.error('Número de teléfono inválido');
      return;
    }
    const formulario = {
      email : form.email.value,
      phone : form.phone.value,
      birthday : form.birthday.value
    }
    console.log(formulario)
    this.userService.editUser(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        setTimeout(() => {
          window.location.href = '/user/profile'
        }, 1000)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }


}
