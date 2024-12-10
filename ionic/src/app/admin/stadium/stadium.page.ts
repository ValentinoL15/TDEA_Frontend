import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Stadium } from 'src/app/interfaces/Stadium';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.page.html',
  styleUrls: ['./stadium.page.scss'],
})
export class StadiumPage implements OnInit {

  id:any
  stadium: Stadium = {
    _id: "",
    code: "",
    type: "",
    length: 0,
    width:0,
    roof: "",
    grass: "",
    punctuaction: ""
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


  constructor(private router: Router, private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getStadium(this.id)
    })
    
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/admin/create-stadium/${this.stadium.belongToSede}`])
  }

  getStadium(id : any){
    this.tournamentServ.getStadium(id).subscribe({
      next: (res : any) => {
        this.stadium = res.estadio
        console.log(this.stadium)
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  editStadium(id:any,form : any){
    const formulario = {
      code: form.code.value,
      type: form.type.value,
      length: form.length.value,
      width: form.width.value,
      roof: form.roof.value,
      grass: form.grass.value,
      punctuaction: form.punctuaction.value
    }
    console.log(formulario)
    this.tournamentServ.editStadium(id,formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)
        window.location.href = `/admin/stadium/${this.id}`
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  async eliminarEstadio() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este estadio?',
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
            this.tournamentServ.deleteStadium(this.id).subscribe({
              next: (res: any) => {
                this.notifyServ.success(res.message);
                setTimeout(() => {
                  window.location.href = `/admin/create-stadium/${this.stadium.belongToSede}`;
                }, 500); 
              },
              error: (err: any) => {
                this.notifyServ.error(err.error.message);
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }

}
