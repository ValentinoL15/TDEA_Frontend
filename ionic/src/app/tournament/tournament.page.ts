import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tournament } from '../interfaces/Tournament';
import { TournamentService } from '../services/tournament.service';
import { NotifyService } from '../services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Day } from '../interfaces/Day';
import { Category } from '../interfaces/Category';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import * as L from 'leaflet';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = (pdfFonts as any).vfs;


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {

  days: Day[] = []
  list: List = {
    typeAlineacion : 0,
    nameList: "",
    teamPicture: ""
  }

  tournament: Tournament = {
    nameFantasy: "",
    ano: 0,
    campeonato: {
      type: ""
    },
    edad: {
      type: ""
    },
    teamSubscribed: [{
      _id: "",
      preferences: []
    }],
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
    formatImage: "",
    torneoImage: "",
    reglamentation: "",
    daysTournament: [{
      day: {
        type: ""
      },
      stadium: {
        _id: "",
        belongToSede: "",
        code: "",
        type: "",
        length: 0,
        width: 0,
        roof: "",
        grass: "",
        punctuaction: "",
      },
      sede: {
        _id: "",
        altitude: 0,
        latitude:0,
        images: ['']
      },
      time: []
    }],
    fixture: [{
      _id: "",
      jornada: 0,
      partidos: [{
        team1: {
          _id: '',
      },
      team2: {
          _id: '',
      },
        local: {
          _id: '',
          nameList: ''
      },
      visitante: {
          _id: '',
          nameList: ''
      },
      resultado: {
          
              team1: 0,
              team2: 0
      },
      
      }]
    }],
    estadisticasJugadores: [
          {
              jugador: {
                  _id: '',
                  firstName: '',
                  lastName: '',
              },
              equipo: {
                  _id: '',
                  nameList: '',
                  typeAlineacion: 0,
                  teamPicture: ''
              },
              goles: 0,
              amarillas: 0,
              rojas: 0
          }
      ],
    tablaPosiciones: [{
          puntos: 0,
          partidosJugados: 0,
          ganados: 0,
          empatados: 0,
          perdidos: 0,
          golesAFavor: 0,
          golesEnContra: 0,
          diferenciaGoles: 0
    }],
    cupos: 0,
  }
  termsAccepted: boolean = false;

  currentYear = new Date().getFullYear();
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private alertController: AlertController, private userService: UserService) { }

  id:any
  map: any;
  marker: any;
  objectPDF: any;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getTournament(this.id)
    })
    this.getDays(this.id)
    this.getLists()
    this.userService.getMyListUpdatedListener().subscribe(() => {
      this.getLists()
    })
  }

  position = {
    lat: 0,  // Valor por defecto de latitud
    lng: 0   // Valor por defecto de longitud
  };

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen2 = false;

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  volver(){
    this.router.navigate(['/user/torneos']);
  }

  getLists(){
    this.userService.getMyList().subscribe({
      next: (res : any) => {
        this.list = res.list
        console.log(this.list)
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
        if (this.tournament.daysTournament && this.tournament.daysTournament[0].sede) {
          const sede = this.tournament.daysTournament[0].sede;
          console.log("Esta es mi sedee", sede)
          if (sede.latitude && sede.altitude) {
            this.position.lat = sede.latitude;  // Actualiza la latitud
            this.position.lng = sede.altitude;  // Actualiza la longitud
            this.loadMap(this.position.lat, this.position.lng); // Llama a la función para cargar el mapa con las coordenadas
          } 
        }
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



  loadMap(lat: number, lng: number) {
    if (!lat || !lng) {
      console.error('Latitud o longitud inválidas:', lat, lng);
      return;
    }

    // Espera hasta que el elemento #map esté disponible
    setTimeout(() => {
      this.map = L.map('map1').setView([lat, lng], 12); // Centra en la ubicación guardada

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.marker = L.marker([lat, lng]).addTo(this.map);
    }, 500);
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
        message: `¿Vas a inscribir la lista: ${this.list.nameList} en este torneo.
        Si ya has leído el reglamento, presiona Inscribirme`,
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

  download() {
    this.tournamentServ.descargarPdf(this.id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reglamento.pdf`; // ✅ Nombre del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error descargando el PDF:', err);
      }
    });
  }
  


  async presentAlertConfirm(id: any, teamListId: string) {
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: `
        He leído y comprendido toda la información relacionada con el torneo y su reglamento.
      `,
      buttons: [
        {
          text: 'No Acepto',
          role: 'cancel',
          handler: () => {
            console.log('Inscripción cancelada');
          }
        },
        {
          text: 'Acepto',
          handler: () => {
            // Aquí se ejecuta la inscripción
            this.userService.anotarseTorneo(this.id, id).subscribe({
              next: (res: any) => {
                setTimeout(() => {
                  this.notifyService.success(res.message);
                }, 1000);
                window.location.href = `user/deudas`;
              },
              error: (err: any) => {
                this.notifyService.error(err.error.message);
              }
            });
          }
        }
      ]
    });
  
    await alert.present(); // Presentar el alert
  }
  
  
  

}
