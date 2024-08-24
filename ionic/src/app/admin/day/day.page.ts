import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from 'src/app/interfaces/Day';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Schedule } from 'src/app/interfaces/Schedule';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  id:any
  dia: Day = {
    day: "",
    horarios: {
      times: []
    }
  }
  horarios: Schedule[] = []
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

  constructor( private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getDay(this.id)
    this.getHorarios()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(id:any){
    this.router.navigate([`/create-day/${this.dia.belongTournament}`])
  }

  getDay(id:any){
    this.tournamentServ.getDay(id).subscribe({
      next: (res : any) => {
        this.dia = res.day
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getHorarios() {
    this.tournamentServ.getSchedules(this.id).subscribe({
      next: (res: any) => {
        this.horarios = res.horarios
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  crearHorario(form:any){
    const formulario = {
    times: form.times.value
    }
    this.tournamentServ.createSchedule(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getDay(this.id),
        this.getHorarios()
        this.setOpen(false)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  isFormValid(form: any): boolean {
    // Verifica que ambos campos tengan exactamente dos dígitos
    const hourValid = form.hour.value.length === 2;
    const minuteValid = form.minute.value.length === 2;
    return hourValid && minuteValid;
  }

  async deleteDay(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar este dia con sus horarios?',
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
            this.tournamentServ.deleteDay(id).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/create-day/${this.dia.belongTournament}`;
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
