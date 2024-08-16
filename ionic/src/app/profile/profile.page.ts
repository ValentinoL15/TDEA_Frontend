import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id:any
  usuario: User = {
    firstName: "",
    docNumber: 0,
    gender: "",
    phone: 0,
    birthday: new Date(),
    email: "",
    password: ""

  }

  public toastButtons = [
    {
      text: 'Ignorar',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
      },
    },
  ];

  //BOTONES
  public alertButtons = [
    {
      text: 'Guardar',
      role: 'ok',
      handler: (data: any) => {
        this.editPhone(data.phone)
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'boton-cancelar',
    },
  ];
  public alertButtonsPassword = [
    {
      text: 'Guardar',
      role: 'ok',
      handler: (data: any) => {
        //this.changePassword(data.password);
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'boton-cancelar',
    },
  ];
  public alertButtonsEmail = [
    {
      text: 'Guardar',
      role: 'ok',
      handler: (data: any) => {
        //this.changeEmail(data.email)
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'boton-cancelar',
    },
  ];

  //INPUTS
  public alertInputs = [
    {
      placeholder: 'ej. +5492477358701',
      name: 'phone',
      type: 'text'
    },
  ];
  public alertInputsPassword = [
    {
      placeholder: 'Introduce una contraseña segura',
      name: 'password',
      type: 'text'
    },
  ];
  public alertInputsEmail = [
    {
      placeholder: 'example@example.com',
      name: 'email',
      type: 'email'
    },
  ];

  

  constructor(private router : Router, private authService: AuthService, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.obtenerUser())
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  logOut() {
    localStorage.removeItem('st_1892@121');  // Elimina el token del localStorage
    this.router.navigate(['/login'] , { replaceUrl: true });     
  }

  obtenerUser(){
    this.authService.getUser().subscribe({
      next: (res : any) => {
        this.usuario = res.user;
      },
      error: (err : any) => {
        console.log(err);
      }
    })
  }

  editPhone(phone : any){
    this.authService.editPhone(phone).subscribe({
      next: (res: any) => {
        this.presentAlert('Solicitud de cambio', res.message)
      },
      error: (err: any) => {
        console.log(err)
        this.presentAlert('Fallo al cambiar teléfono', err.error.message)
      }
    })
  }

}
