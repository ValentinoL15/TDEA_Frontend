import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifyService } from '../services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../interfaces/Team';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  id:any
  equipo: Team = {
    teamName: "",
    teamNotes: "",
    isTeamListActive: false,
    socialMedia: "",
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

  constructor(private userService: UserService, private notifyService: NotifyService, private route: ActivatedRoute, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getTeam(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  goLists(id:any){
    this.router.navigate([`/create-list/${id}`])
  }

  volver(){
    this.router.navigate(['/user/home'])
  }

  getTeam(id:any){
    this.userService.getTeam(id).subscribe({
      next: (res : any) => {
        this.equipo = res.team
      },
      error: (err : any) => {
        console.log(err)
      }
    })
  }

  editTeam(id:any, form:any){
    const formulario = {
      teamName: form.teamName.value,
      teamNotes: form.teamNotes.value,
      socialMedia: form.socialMedia.value,
      isTeamListActive: form.isTeamListActive.value
    }
    this.userService.editTeam(id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getTeam(id)
        this.setOpen(false)
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


}
