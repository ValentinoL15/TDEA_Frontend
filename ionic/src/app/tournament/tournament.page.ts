import { Component, OnInit } from '@angular/core';
import { Tournament } from '../interfaces/Tournament';
import { TournamentService } from '../services/tournament.service';
import { NotifyService } from '../services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Day } from '../interfaces/Day';
import { Category } from '../interfaces/Category';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {

  days: Day[] = []
  lists: List[] = []

  tournament: Tournament = {
    nameFantasy: "",
    ano: 0,
    campeonato: {
      type: ""
    },
    edad: {
      type: ""
    },
    rangeAgeSince: 0,
    rangeAgeUntil: 0,
    ageDescripcion: "",
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
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    daysTournament: [{
      _id:"",
    creator: "",
    belongTournament: "",
    day: "",
    sede: [{
      _id: "",
    creator: "",
    belongDay: "",
    stadium: {
        _id: "",
        belongToSede: "",
        code: "",
        type: 0,
        length: 0,
        width: 0,
        roof: "",
        grass: "",
        punctuaction: 0,
    },
    times: []
    }]
    }],
    cupos: 0
  }
  currentYear = new Date().getFullYear();
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController, private userService: UserService) { }

  id:any

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getTournament(this.id)
    })
    this.getDays(this.id)
    this.getLists()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/user/torneos']);
  }

  getLists(){
    this.userService.getAllLists().subscribe({
      next: (res : any) => {
        this.lists = res.listsOwner
        console.log(this.lists)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.messsage)
      }
    })
  }

  getTournament(id:any){
    this.tournamentServ.getTournament(id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound
        this.tournament.tournamentDate = this.adjustDate(new Date(this.tournament.tournamentDate));
        console.log(this.tournament)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getDays(id : any){
    this.tournamentServ.getDays(id).subscribe({
      next: (res : any) => {
        this.days = res.days
        console.log(this.days)
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

  async confirmInscription(teamListId: string, teamListName: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Inscripción',
      message: `¿Estás seguro de inscribir la lista: ${teamListName} en este torneo?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Inscripción cancelada');
          }
        },
        {
          text: 'Inscribirme',
          handler: () => {
            this.inscribirse(teamListId);
          }
        }
      ]
    });
  
    await alert.present();
  }

  inscribirse(teamListId: string) {
    const payload = { teamListId };  // Crea un objeto con el teamListId
    this.userService.ingresarTorneo(this.id, payload).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        setTimeout(() => {
          window.location.href = `/user/home`
        }, 800)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

}
