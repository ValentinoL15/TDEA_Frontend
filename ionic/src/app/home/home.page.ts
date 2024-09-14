import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { IonModal } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Team } from '../interfaces/Team';


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
    teamImage:""
  }
  equipoSeleccionado: Team | null = null; 
  team: any = {}


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor( private router:Router, private userService : UserService, private route: ActivatedRoute) { }
  @ViewChild(IonModal) modal!: IonModal ;

  ngOnInit() {
    this.getTeams()
  }

   customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
  };

  onEquipoChange(equipoId: any) {
    this.equipoSeleccionado = this.equipos.find(e => e._id === equipoId) || null;
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

  ir() {
    this.router.navigate(['/create-team']);
  }

}