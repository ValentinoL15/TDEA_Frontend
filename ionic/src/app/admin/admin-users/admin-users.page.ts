import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/User';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
id:any
user: User = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  rol: [],
  gender: "",
  phone: 0,
  docNumber: 0
}

public alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      console.log('Alert canceled');
    },
  },
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      console.log('Alert confirmed');
    },
  },
];
setResult(ev : any) {
  console.log(`Dismissed with role: ${ev.detail.role}`);
}


constructor(private route : ActivatedRoute, private router: Router,private userService: UserService, private notifyService: NotifyService, private alertController: AlertController) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
  })
  this.getUser()
}

getUser(){
  this.userService.getUser(this.id).subscribe({
    next: (res : any) => {
      this.user = res.user
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

volver(){
  this.router.navigate(['/my-users'])
}

async deleteUser(id: any) {
  const alert = await this.alertController.create({
    header: 'Confirmar eliminación',
    message: `¿Estás seguro de que quieres eliminar al usuario ${this.user.firstName}? `,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // El usuario ha cancelado, no hacer nada
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          // El usuario ha confirmado, proceder con la eliminación
          this.userService.deleteUser(id).subscribe({
            next: (res: any) => {
              window.location.href = `/my-users`
            },
            error: (err: any) => {
              this.notifyService.error(err.error.message);
            }
          });
        }
      }
    ]
  });

  await alert.present();
}

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

editUser(form:any){
  const formulario = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    docNumber: form.docNumber.value,
    gender: form.gender.value,
    rol: form.rol.value
  }
  this.userService.editUser(this.id, formulario).subscribe({
    next: (res: any) => {
      this.notifyService.success('Usuario actualizado con éxito');
      window.location.href = `/admin-users/${this.id}`
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  })
}


}
