import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
})
export class SedePage implements OnInit {

  id:any
  sede: Sede = {
    _id: "",
    belongToEmpresa: "",
    name : "",
    alias: "",
    status: "",
    phone: 0,
    celular: 0,
    adress: "",
    barrio: "",
    socialRed: "",
    daysAttention: [
      {
        day: "",
        start: "",
        end: ""
      },
    ],
    encargado: "",
    dueno: ""
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

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router, private alertController: AlertController) { }
  
  dias = {
    daysAttention: ['Lunes', 'Miercoles', 'Viernes'] // Inicializar con días seleccionados
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getSede(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/admin/create-sede/${this.sede.belongToEmpresa}`])
  }

  goStadium(){
    this.router.navigate([`/admin/create-stadium/${this.id}`])
  }

  goSede(){
    this.router.navigate([`/admin/sede-horarios/${this.id}`])
  }

  getSede(id:any){
    this.tournamentServ.getSede(id).subscribe({
      next: (res:any) => {
        this.sede = res.sede
      },
      error: (err:any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

  editSede(form:any){
    const formulario = {
      name: form.name.value,
      alias: form.alias.value,
      adress: form.adress.value,
      socialRed: form.socialRed.value,
      daysAttention: form.daysAttention.value,
      phone: form.phone.value,
      celular: form.celular.value,
      encargado: form.encargado.value,
      dueno: form.dueno.value,
      barrio: form.barrio.value,
      status: form.status.value
    }
    this.tournamentServ.editSede(this.id, formulario).subscribe({
      next: (res:any) => {
        this.notifyServ.success(res.message)
        window.location.href = `/admin/sede/${this.id}`
      },
      error: (err:any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

async eliminarSede() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta sede con sus estadios?',
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
            this.tournamentServ.deleteSede(this.id).subscribe({
              next: (res: any) => {
                this.notifyServ.success(res.message);
                setTimeout(() => {
                  window.location.href = `/admin/create-sede/${this.sede.belongToEmpresa}`;
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
