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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alineaciones',
  templateUrl: './alineaciones.page.html',
  styleUrls: ['./alineaciones.page.scss'],
})
export class AlineacionesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

form: FormGroup
selectedFile: File | null = null;
alineacion: Alineacion = {
  _id: "",
}

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService,  private spinnerService: SpinnerService, private alertController: AlertController, private formBuilder: FormBuilder) {
  this.form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required]],
    dni: ['', Validators.required],
    nacimiento: ['', Validators.required],
    shirtNumber: ['', Validators.required]
  })
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
  _id: "",
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
  teamList: {
    typeAlineacion: 0,
    shirtColor: "",
    alternativeShirtColor: "",
    belongToTournament: "",
    nameList: "",
    teamPicture: "",
    suplente: [{
      _id: "",
      firstName: ""
  }],
  titular: [{
      _id: "",
      firstName: ""
  }]
  },
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
titularSeleccionado: string | null = null;
player: Player = {
  _id: "",
  firstName: "",
  lastName: "",
  dni: 0,
}
suplente: any
myPlayer: any = null
myPlayer2: any = null
selectedPlayerId: any 

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
    this.formacion = params['alineacion']
  })
  this.getList(this.id)
  this.getSuplentes()
  this.getTitulares()
  this.getAlineacion()
  this.getTeam()
}

volver(){
  window.location.href = `/user/create-list`
}

/*addPLayers() {
  if (this.isModalOpen) {
    this.setOpen(false);  // Cierra el modal si está abierto
  }
  // Espera un breve momento para asegurar el cierre del modal antes de navegar
  setTimeout(() => {
    this.router.navigate([`add-players/${this.id}`]);
  }, 300);  // Ajusta el tiempo de espera si es necesario
}*/


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
      console.log(this.list.shirtColor)
    },
    error: (err: any) => {
      console.error(err);
    }
  })
}

agregarJugador(){
  this.userService.agregarSuplentes(this.id,this.myPlayer).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getTitulares()
      this.getSuplentes()
      this.getList(this.id)
      this.myPlayer = null
      this.myPlayer2 = null
      this.selectedPlayerId = null

    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
      this.myPlayer = null
      this.myPlayer2 = null
      this.selectedPlayerId = null
    }
  })
}

async selectedPlayer(player : any) {
          if (!player._id) {
            this.notifyService.error('ID del jugador no disponible');
            return;
        }
        this.myPlayer = player._id
        this.myPlayer2 = player._id
        this.selectedPlayerId = player._id; 
    }

isSelected(playerId: any): boolean {
  return this.selectedPlayerId === playerId;
}

async eliminarPlayer() {
  const alert = await this.alertController.create({
    header: 'Confirmar eliminación',
    message: `¿Estás seguro de que quieres eliminar de esta lista?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.myPlayer = null
          this.myPlayer2 = null
          this.selectedPlayerId = null
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.userService.eliminarSuplente(this.id, this.myPlayer2).subscribe({
            next: (res : any) => {
              this.notifyService.success(res.message)
              this.getList(this.id)
              this.getSuplentes()
              this.getTitulares()
              this.myPlayer2 = null
              this.myPlayer = null
              this.selectedPlayerId = null
            },
            error: (err: any) => {
              this.notifyService.error(err.error.message)
              this.myPlayer2 = null
              this.myPlayer = null
              this.selectedPlayerId = null
            }
          })
        }
      }
    ]
  });

  await alert.present();
}

goList(){
  this.router.navigate([`/list/${this.id}`])
}

addSuplente(){
  this.userService.enviarSuplente(this.formacion, this.selectedPosition).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getList(this.id)
      this.getSuplentes()
      this.getTitulares()
      this.setOpen(false)
      this.getTeam()
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
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

getAlineacion(){
  this.userService.getAlineacion(this.formacion).subscribe({
    next: (res: any) => {
      this.alineacion = res.alineacion
      console.log(this.alineacion)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getShirtImage(color: string): string {
  const colour = this.list.shirtColor; // Accede al color de la camiseta
  switch (colour) {
    case '#6A1B9A':
      return '../../assets/icon/remera-violeta.svg';
    case '#FAFAFA':
      return '../../assets/icon/shirt-solid (1).svg';
    case '#212121':
      return '../../assets/icon/remera-negra.svg';
    case '#00C853':
      return '../../assets/icon/remera-verde.svg';
    case '#FF6F00':
      return '../../assets/icon/remera-naranja.svg';
    case '#FFFF00':
      return '../../assets/icon/remera-amarilla.svg';
    case '#304FFE':
      return '../../assets/icon/remera-azul.svg';
    case '#C62828':
      return '../../assets/icon/remera-roja.svg';
    // Añade más casos para cada color
    default:
      return '../../assets/icon/remera-titulares.svg'; // Imagen por defecto
  }
}

editFormacion(event: any) {
  const formacionValue = event.detail.value; // Obtiene el valor seleccionado
  const formulario = {
    formacion: formacionValue
  };
  
  this.userService.editFormacion(this.id, formulario).subscribe({
    next: (res: any) => {
      this.notifyService.success(res.message);
      this.getList(this.id)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message);
    }
  });
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

getTeam(){
  this.userService.getTeamActive().subscribe({
    next: (res : any) => {
      this.equipo = res.team
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
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
  if (this.selectedPlayerId === playerId) {
    return '../../assets/icon/remera-verde.svg'; // Imagen verde o seleccionada
  }
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

/***********************************************MODAL-LIST*******************************/

isCreatePlayerModalOpen = false;

openCreatePlayerModal() {
  this.setOpen(false)
  this.isCreatePlayerModalOpen = true; // Abre el modal de crear jugador
}

closeCreatePlayerModal() {
  this.isCreatePlayerModalOpen = false; // Cierra el modal de crear jugador
}
restartPlayers(){
  window.location.href = '/user/players'
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile = file;
  console.log('Archivo seleccionado:', file);
}

crearJugador(){
  const formData = new FormData();
  formData.append('firstName', this.form.get('firstName')?.value);
  formData.append('lastName', this.form.get('lastName')?.value);
  formData.append('dni', this.form.get('dni')?.value);
  formData.append('nacimiento', this.form.get('nacimiento')?.value);
  formData.append('shirtNumber', this.form.get('shirtNumber')?.value);
  formData.append('image', this.selectedFile as Blob);
  console.log("My list: " ,this.list._id)
  this.userService.agregarJugadorLista(this.list._id,formData).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.form.reset()
      this.getList(this.id)
      this.getSuplentes()
      this.getTitulares()
      this.selectedFile = null;

    // Resetear manualmente el campo de archivo
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';  // Resetear el valor del input file
    }
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
  
}

isAddPlayerModalOpen = false;

openAddPlayerModal() {
  this.isAddPlayerModalOpen = true;
}

closeAddPlayerModal() {
  this.isAddPlayerModalOpen = false;
}


isAddPlayersTeam = false

openPlayersTeam(){
  this.setOpen(false)
  this.isAddPlayersTeam = true;
}

closePlayersTeam(){
  this.myPlayer = null
  this.myPlayer2 = null
  this.isAddPlayersTeam = false;
  this.selectedPlayerId = null
}

isTitularList(playerId: string) {
  return this.equipo.teamList?.titular?.some(player => player._id === playerId);
}

isSuplenteList(playerId: string) {
  return this.equipo.teamList?.suplente?.some(player => player._id === playerId);
}

isNoListado(playerId: any) {
  return !this.isTitular(playerId) && !this.isSuplente(playerId);
}

}
