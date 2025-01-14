import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { Team } from '../interfaces/Team';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

constructor(private router: Router, private route: ActivatedRoute, private notifyService: NotifyService, private userService: UserService, private alertController: AlertController, private fb: FormBuilder) { 
  this.form = this.fb.group({
    teamName: [null],
    socialMedia: [null],
    teamNotes: [null]
  })
}

id: any
team : Team = {
  teamName: "",
  teamNotes: "",
  socialMedia: "",
  active: false
}
isTeamEdited: boolean = false;
selectedFile: File | null = null;
form : FormGroup

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

public alertImagen = [
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
      this.editImagen()
    },
  },
];
setResults(ev : any) {
  console.log(`Dismissed with role: ${ev.detail.role}`);
}

//INPUTS
public alertInputImage = [
  {
    placeholder: 'Elige una foto',
    name: 'image',
    type: 'file'
  },
];

ngOnInit() {
  this.route.params.subscribe( params => {
    this.id = params['id'];
  })
  this.getTeam()
}

getTeam(){
  this.userService.getTeam(this.id).subscribe({
    next: (res : any) => {
      this.team = res.team
      this.form.patchValue({
        teamName: this.team.teamName,
        socialMedia: this.team.socialMedia,
        teamNotes: this.team.teamNotes
      })
    },
    error: (err) => {
      this.notifyService.error(err.error.message)
    }
  })
}

volver(){
  this.router.navigate(['/user/home'])
}

editTeam(){
    const formulario = {
      teamName: this.form.value.teamName,
      teamNotes: this.form.value.teamNotes,
      socialMedia: this.form.value.socialMedia,
    }
    this.userService.editTeam(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getTeam()
        this.form.reset(this.team); // Resetea el formulario al estado inicial
        this.isTeamEdited = false
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  async deleteTeam(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar este equipo?',
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
            this.userService.eliminarTeam(id).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/user/home`;
                }, 500); 
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

  onSelectImage() {
    const fileInput = document.getElementById('file-input-team') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo oculto
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);

    if (file) {
      this.editImagen();
    }
  }

  async presentAlertImagen() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres cambiar la imagen del equipo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.editImagen(); // Llama a la función para editar la imagen
          }
        }
      ]
    });
  
    await alert.present();
  }

  editImagen(){
    const form = new FormData();
      form.append('image', this.selectedFile as Blob);
    this.userService.editPhoto(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getTeam()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  deletePhoto(){
    this.userService.deletePhotoTeam(this.id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getTeam()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }


}
