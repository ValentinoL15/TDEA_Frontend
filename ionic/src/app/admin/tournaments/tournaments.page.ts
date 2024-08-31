import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/Category';
import { Format } from 'src/app/interfaces/Format';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

  id:any
  categories: Category[] = [];
  formats: Format[] = []
  tournament: Tournament = {
    nameFantasy: "",
    ano: new Date().getFullYear(),
    type: "",
    rangeAgeSince: 0,
    rangeAgeUntil: 0,
    category: {
      _id: "",
      categoryName : "",
      ageLimiter : 0
    },
    format: {
      _id:"",
    formatName: "",
    minPlayers: 0,
    maxPlayers: 0
    },
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false
  }
  currentYear = new Date().getFullYear();

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getTournament(this.id)
    })
    this.getCategories()
    this.getFormats()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/admin/home-tournament'])
  }

  goDay(){
    this.router.navigate([`/create-day/${this.id}`])
  }

  goStadiums(){
    this.router.navigate([`/stadiums-disponibles/${this.id}`])
  }

  getCategories(){
    this.tournamentServ.getCategories().subscribe({
      next: (res : any) => {
        this.categories = res.categories
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }
  
  getFormats(){
    this.tournamentServ.getFormats().subscribe({
      next: (res : any) => {
        this.formats = res.formats
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getTournament(id:any){
    this.tournamentServ.getTournament(id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound
        this.tournament.tournamentDate = this.adjustDate(new Date(this.tournament.tournamentDate));
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  adjustDate(date: Date): Date {
    // Ajuste para compensar el desfase de la zona horaria
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + offset * 60000);
    return adjustedDate;
  }

  editTournament(id:any, form:any){
    const formulario = {
      nameFantasy: form.nameFantasy.value,
      rangeAgeSince: form.rangeAgeSince.value,
      rangeAgeUntil: form.rangeAgeUntil.value,
      tournamentDate: form.tournamentDate.value,
      category: form.category.value,
      format: form.format.value,
      isTournamentMasculine: form.isTournamentMasculine.value,
      isTournamentActive: form.isTournamentActive.value,
      tournamentNotes: form.tournamentNotes.value
    };
    this.tournamentServ.editTournament(id, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        this.getTournament(id)
        window.location.href = `/tournaments/${this.id}`
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
    
  }

  async deleteTorneo(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar este Torneo?. Se borrarán todos sus datos',
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
            this.tournamentServ.deleteTournament(id).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/admin/home-tournament`;
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
