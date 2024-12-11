import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { IonModal } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Team } from '../interfaces/Team';
import { NotifyService } from '../services/notify.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id:any
  equipos: Team[] = []
  equipo: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    status: "",
    pictureAccept: false,
    teamImage:"",
    active: false
  }
  equipoSeleccionado: Team | null = null; 
  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    teamImage:"",
    active: false
  }
  user = {
    _id: "",
    completedFormMarket: false
  }
  emptyUser: any = {}


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private router:Router, private userService : UserService, private route: ActivatedRoute, private notifyService: NotifyService, private AuthService: AuthService) { }
  @ViewChild(IonModal) modal!: IonModal ;

  ngOnInit() {
    this.getTeams()
    this.getTeamActive()
    this.getUserEmpty()
    this.userActive()
  }

  customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
  };

  userActive(){
    this.user = this.AuthService.getUserRole()
    console.log(this.user)
    
  }

  onEquipoChange(equipoId: any) {
    this.equipoSeleccionado = this.equipos.find(e => e._id === equipoId) || null;
    this.cambiarActivo(equipoId)
  }

  goTeam(id:any){
    this.router.navigate([`/team/${id}`])
  }

  getTeams(){
    this.userService.getTeams().subscribe({
      next: (res : any) => {
        this.equipos = res.teams 
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getTeamActive(){
    this.userService.getTeamActive().subscribe({
      next: (res : any) => {
        this.team = res.team
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getUserEmpty(){
    this.userService.getEmpty().subscribe({
      next: (res : any) => {
        this.emptyUser = res.userEmpty
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cambiarActivo(equipoId : any){
    this.userService.actualizarEquipo(equipoId).subscribe({
      next: (res : any) => {
        window.location.href = `/user/home`
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  ir() {
    this.router.navigate(['/create-team']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

}