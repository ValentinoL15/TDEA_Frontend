import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Campeonato } from 'src/app/interfaces/Campeonato';
import { Category } from 'src/app/interfaces/Category';
import { Edad } from 'src/app/interfaces/Edad';
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
  campeonatos: Campeonato[] = []
  edades: Edad[] = []
  tournament: Tournament = {
    nameFantasy: "",
    ano: 0,
    campeonato:{
      _id: "",
      type: ""
    },
    edad: {
      _id: "",
      type: ""
    },
    rangeAgeSince: 0,
    rangeAgeUntil: 0,
    ageDescripcion: "",
    category: {
      _id: "",
      categoryName : "",
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
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0,
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
    this.getCampeonatos()
    this.getEdades()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/admin/home-tournament'])
  }

  goDay(){
    this.router.navigate([`/admin/create-day/${this.id}`])
  }

  goStadiums(){
    this.router.navigate([`/admin/stadiums-disponibles/${this.id}`])
  }
  
  goTeasmSubscribed(){
    this.router.navigate([`/admin/suscribed-teams/${this.id}`])
  }

  getCampeonatos(){
    this.tournamentServ.getCampeonatos().subscribe({
      next: (res : any) => {
        this.campeonatos = res.campeonatos
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getEdades(){
    this.tournamentServ.getEdades().subscribe({
      next: (res : any) => {
        this.edades = res.edades
      },
      error: (err : any) => {
        this.notifyService.error(err.error.message)
      }
    })
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
        console.log(this.tournament)
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
      campeonato: form.campeonato.value,
      edad: form.edad.value,
      ano:form.ano.value,
      category: form.category.value,
      format: form.format.value,
      isTournamentMasculine: form.isTournamentMasculine.value,
      isTournamentActive: form.isTournamentActive.value,
      tournamentNotes: form.tournamentNotes.value,
      tarifaInscripcion: form.tarifaInscripcion.value,
      tarifaPartido: form.tarifaPartido.value
    };
    console.log(formulario)
    this.tournamentServ.editTournament(id, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        this.getTournament(id)
        window.location.href = `/admin/tournaments/${this.id}`
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
