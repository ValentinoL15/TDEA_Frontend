import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '../services/notify.service';
import { Player } from '../interfaces/Player';
import { date, format } from "@formkit/tempo"

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  form: FormGroup

  id:any
  list: List = {
    ownerUser: { firstName: "",
      lastName: "",
    },
    ownerTeam: {
      _id: ""
    },
    typeAlineacion: 0,
    alineacion: {
      _id: "",
    teamList: "",
    arquero: {
      _id: "",
    firstName: "",
    },
    defensor1: {
      _id: "",
      firstName: "",
    },
    defensor2: {
      _id: "",
      firstName: "",
    },
    defensor3: {
      _id: "",
      firstName: "",
    },
    defesnor4: {
      _id: "",
      firstName: "",
    },
    mediocampista1: {
      _id: "",
      firstName: "",
    },
    mediocampista2: {
      _id: "",
      firstName: "",
    },
    mediocampista3: {
      _id: "",
      firstName: "",
    },
    mediocampista4: {
      _id: "",
      firstName: "",
    },
    delantero1: {
      _id: "",
      firstName: "",
    },
    delantero2: {
      _id: "",
      firstName: "",
    },
    },
    teamPicture: "",
    shirtColor: "",
    alternativeShirtColor: "",
    nameList: "",
  }
  player: Player = {
    _id: "",
    firstName: "",
    lastName: "",
    nacimiento: "yyyy-mm-dd",
    dni: 0,
    shirtNumber: 0,
    picturePlayer: ""
  }
  players: Player[] = []
  selectedFile: File | null = null;



  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      shirtNumber: ['', Validators.required]
    })
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getList(this.id)
    this.obtenerJugadores(this.id)
  }


  volver(id:any){
    this.router.navigate([`/list/${id}`])
  }

  goPlayer(id:any){
    this.router.navigate([`/edit-player/${id}`])
  }

  obtenerJugadores(id:any){
    this.userService.getPlayers(id).subscribe({
      next: (res : any) => {
        this.players = res.listOfPlayers
        },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
        }
      })
        }   
  

  crearJugador(id:any, form: any){
    const formData = new FormData();
    formData.append('firstName', this.form.get('firstName')?.value);
    formData.append('lastName', this.form.get('lastName')?.value);
    formData.append('dni', this.form.get('dni')?.value);
    formData.append('nacimiento', this.form.get('nacimiento')?.value);
    formData.append('shirtNumber', this.form.get('shirtNumber')?.value);
    formData.append('image', this.selectedFile as Blob);
    this.userService.crearJugador(id, formData).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.obtenerJugadores(id)
        this.form.reset()
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

  getList(id:any){
    this.userService.getList(id).subscribe({
      next: (res : any) => {
        this.list = res.list
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  /* adjustDate(date: Date): Date {
    // Ajuste para compensar el desfase de la zona horaria
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + offset * 60000);
    return adjustedDate;
  }*/

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }


}
