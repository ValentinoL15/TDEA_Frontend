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
      categoryName : ""
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
      day: {
        type: ""
      },
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
      time: {
        _id: "",
        type: [] // Aquí debes definir correctamente el array de strings según el tipo esperado
      }
    }],
    cupos: 0,
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
        console.log("Este es mi torneo:" ,this.tournament)
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

  /*async confirmInscription(teamListId: string, teamListName: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Inscripción',
      message: `¿Estás seguro de inscribir la lista: ${teamListName} en este torneo?`,
      inputs: [
        {
          name: 'userPrice',
          type: 'number',
          placeholder: 'Ingresa el monto a pagar',
          min: 0 // Puedes agregar restricciones como mínimo valor
        }
      ],
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
          handler: (data) => {
            const userPrice = parseFloat(data.userPrice); // Convertir a número
            console.log('Monto ingresado:', userPrice);
            if (isNaN(userPrice) || userPrice <= 0) {
              this.notifyService.error("Por favor ingrese un monto válido");
              return; // Detener la ejecución si el monto no es válido
            }
            this.inscribirse(teamListId, userPrice); // Pasar el valor al método inscribirse
          }
        }
      ]
    });
  
    await alert.present();
  }

  inscribirse(teamListId: string, monto: number) {
    const payload = { teamListId, monto }; // Asegúrate de incluir 'monto' en el payload
    this.userService.ingresarTorneo(this.id, payload).subscribe({
      next: (res: any) => {
        if (res.redirectUrl) {
          // Redirige al usuario a la URL de Mercado Pago
          window.location.href = res.redirectUrl;
        } else {
          console.log('Error: No se recibió una URL de redirección');
        }
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }*/

    async inscription(id: any, teamListId: string) {
      const alert = await this.alertController.create({
        header: 'Confirmar Inscripción',
        message: `¿Estás seguro de inscribir la lista: ${teamListId} en este torneo?`,
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
            handler: () => {  // No redefinas `id` aquí
              console.log(id);  // Ahora `id` se refiere al parámetro de `inscription`
              this.userService.anotarseTorneo(this.id, id).subscribe({
                next: (res: any) => {
                  setTimeout(() => {
                    this.notifyService.success(res.message)
                  }, 1000)
                  window.location.href = `user/deudas`
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
