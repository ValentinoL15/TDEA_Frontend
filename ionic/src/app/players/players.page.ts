import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '../services/notify.service';
import { Player } from '../interfaces/Player';

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
    shirtColor: "",
    alternativeShirtColor: "",
    teamListNotes: "",
    isTeamListActive: false,
    teamListStatus: "",
    division: {
      _id:"",
      order: 0
    },
    nameList: "",
  }
  player: Player = {
    _id: "",
    firstName: "",
    lastName: "",
    age: 0
  }
  players: Player[] = []


  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      age: ['', Validators.required]
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
    const formulario = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      age: this.form.value.age
    };
    this.userService.crearJugador(id, formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.obtenerJugadores(id)
        this.form.reset()
        this.setOpen(false)
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

  editarPlayer(){

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
