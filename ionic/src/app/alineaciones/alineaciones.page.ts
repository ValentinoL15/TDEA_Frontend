import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { List } from '../interfaces/List';
import { Team } from '../interfaces/Team';
import { Player } from '../interfaces/Player';
import { Alineacion } from '../interfaces/Alineacion';
import { SpinnerService } from '../services/spinner.service';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-alineaciones',
  templateUrl: './alineaciones.page.html',
  styleUrls: ['./alineaciones.page.scss'],
})
export class AlineacionesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService,  private spinnerService: SpinnerService, private alertController: AlertController) {
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

list: List = {
  ownerUser: { firstName: "", lastName: "" },
  ownerTeam: { _id: "" },
  typeAlineacion: 0,
  teamPicture: "",
  shirtColor: "",
  alineacion: {
    arquero: { _id: "", firstName: "" },
    defensor1: { _id: "", firstName: "" },
    defensor2: { _id: "", firstName: "" },
    defensor3: { _id: "", firstName: "" },
    mediocampista1: { _id: "", firstName: "" },
    mediocampista2: { _id: "", firstName: "" },
    mediocampista3: { _id: "", firstName: "" },
    delantero1: { _id: "", firstName: "" },
    delantero2: { _id: "", firstName: "" },
    delantero3: {_id: "",firstName: "",},
  },
  alternativeShirtColor: "",
  nameList: "",
  players: [{
    _id: "",
    firstName: "",
    lastName: "",
    dni: 0,
    shirtNumber: 0,
    nacimiento: "",
    ownerList: "",
    picturePlayer: ""
  }],
  suplente: [{
    _id: "",
    firstName: ""
  }],
  titular: [{
    _id: "",
    firstName: ""
  }]
};

team: Team = {
  _id: "",
  teamName: "",
  teamNotes: "",
  socialMedia: "",
  active: false
}

id:any
formacion: any
equipo: Team = {
  _id: "",
  teamName: "",
  teamNotes: "",
  socialMedia: "",
  active: false,
  players: [{
    _id: "",
    firstName: "",
    lastName: "",
  }]
}
formatoSeleccionado: any;
players: Player[] = []
suplentes:Player[] = [];
titulares: Player[] = []
selectedPosition: string | null = null;
player: Player = {
  _id: "",
  firstName: "",
  lastName: "",
  dni: 0,
}


ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
    this.formacion = params['alineacion']
  })
  this.getList(this.id)
  this.getSuplentes()
  this.getTitulares()
}

volver(){
  window.location.href = `/user/create-list`
}

addPLayers() {
  if (!this.isModalOpen) {
    this.router.navigate([`add-players/${this.id}`]);
  } else {
    this.notifyService.error("Por favor agrega un jugador a la formación antes de agregar un jugador al equipo")
  }
}
isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

openModal(position: any) {
  this.selectedPosition = position;
  this.setOpen(true);
}

getList(id:any){
  this.userService.getList(id).subscribe({
    next: (res : any) => {
      this.list = res.list
      console.log(this.list)
    },
    error: (err: any) => {
      console.error(err);
    }
  })
}

async selectedPlayer(player : any) {
  const alert = await this.alertController.create({
    header: 'Confirmar Suplente',
    message: `¿Estás seguro de que quieres agregar a ${player.firstName + " " + player.lastName} a los suplentes?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // El usuario ha cancelado, no hacer nada
        }
      },
      {
        text: 'Agregar',
        handler: () => {
          // El usuario ha confirmado, proceder con la eliminación
          if (!player._id) {
            this.notifyService.error('ID del jugador no disponible');
            return;
        }
            this.userService.agregarSuplentes(this.id, player._id).subscribe({
              next: (res : any) => {
                this.notifyService.success(res.message)
                this.getList(this.id)
                this.getSuplentes()
                this.getTitulares()
              },
              error: (err: any) => {
                this.notifyService.error(err.error.message)
              }
            })
        }
      }
    ]
  });

  await alert.present();
}

async eliminarPlayer(player : any) {
  const alert = await this.alertController.create({
    header: 'Confirmar eliminación',
    message: `¿Estás seguro de que quieres eliminar a ${player.firstName + " " + player.lastName} de los suplentes y de esta lista?`,
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
          if (!player._id) {
            this.notifyService.error('ID del jugador no disponible');
            return;
          }
          this.userService.eliminarSuplente(this.id, player._id).subscribe({
            next: (res : any) => {
              this.notifyService.success(res.message)
              this.getList(this.id)
              this.getSuplentes()
              this.getTitulares()
            },
            error: (err: any) => {
              this.notifyService.error(err.error.message)
            }
          })
        }
      }
    ]
  });

  await alert.present();
}

isAvailable(player: Player): boolean {
  const isTitular = this.list.titular?.some(titular => titular._id === player._id);
  const isSuplente = this.list.suplente?.some(suplente => suplente._id === player._id);
  
  return !isTitular && !isSuplente;
}

getSuplentes(){
  this.userService.getSuplentes(this.id).subscribe({
    next: (res: any) => {
      this.suplentes = res.suplentes
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getTitulares(){
  this.userService.getTitulares(this.id).subscribe({
    next: (res: any) => {
      this.titulares = res.titulares
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}




/**********************ARQUERO-ALINEACION**********************/ 
selectPlayer(player: any) {
  if (this.selectedPosition && this.list.alineacion) {
    // Llamar al servicio para actualizar la posición
    this.userService.updatePosition(this.formacion, this.selectedPosition, player._id).subscribe({
      next: (res : any) => {
          this.getList(this.id)
          this.setOpen(false)
          this.getSuplentes()
          this.getTitulares()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }
  
}

resetAlineacion(){
  this.userService.resetearPosiciones(this.id).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getList(this.id)
      this.getSuplentes()
      this.getTitulares()
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  })
}

isTitular(playerId: any): boolean {
  return this.list?.titular?.some((titularPlayer: any) => titularPlayer._id === playerId) || false;
}

isSuplente(playerId: any): boolean {
  return this.list?.suplente?.some((suplentePlayer: any) => suplentePlayer._id === playerId) || false;
}

getCamisetaImage(playerId: any): string {
  if (this.isTitular(playerId)) {
    return '../../assets/icon/remera-titulares.svg';  // Imagen para titulares
  } else if (this.isSuplente(playerId)) {
    return '../../assets/icon/remera-titulares.svg';  // Imagen para suplentes
  } else {
    return '../../assets/icon/shirt-solid (1).svg';  // Imagen para jugadores no listados
  }
}


////////////////////////MODAL ID/////////////////////////////////

message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
name?: string;

cancel() {
  window.location.href = `/alineaciones/${this.id}/${this.formacion}`
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}


}
