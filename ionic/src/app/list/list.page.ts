import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { IonicModule, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TournamentService } from '../services/tournament.service';
import { Division } from '../interfaces/Division';
import { FilterPipe } from '../filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true, // Marca el componente como standalone si es necesario
  imports: [CommonModule, FormsModule, IonicModule, FilterPipe, ReactiveFormsModule] // Importa los módulos y pipes necesarios
})

export class ListPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService) { }
  @ViewChild(IonModal) modal!: IonModal;
  id:any
  divisiones: Division[] = []
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
  name:string = ""
  selectedDivision: number = this.list.division.order;
  idOwnerTeam:any
  divisionId:any

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getLista(this.id)
    this.getDivisions()
  }

  onDivisionChange(event: any) {
    this.selectedDivision = event.detail.value;
    // Aquí puedes realizar acciones adicionales si es necesario
  }

  goPlayers(id:any){
    this.router.navigate([`/players/${id}`])
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getDivisions(){
    this.tournamentServ.getDivisions().subscribe({
      next: (res : any) => {
        this.divisiones = res.divisions
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

  confirm(id:any, form:any){
    const formulario = {
      shirtColor: form.shirtColor.value,
      alternativeShirtColor: form.alternativeShirtColor.value,
      teamListNotes: form.teamListNotes.value,
      isTeamListActive: form.isTeamListActive.value === 'true',
      teamListStatus: form.teamListStatus.value,
      division: form.division.value
    }
    console.log(formulario)
    this.userService.editList(id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        window.location.href = `/create-list/${this.list.ownerTeam?._id}`
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }


  volver(id:any){
    this.router.navigate([`/create-list/${id}`])
  }

  getLista(id:any) {
    this.userService.getList(id).subscribe({
      next: (res : any) => {
        this.list = res.list;
        this.name = `${this.list.ownerUser?.firstName} ${this.list.ownerUser?.lastName}`;
        this.idOwnerTeam = `${this.list.ownerTeam?._id}`
        this.divisionId = `${this.list.division._id}`;
        console.log(this.divisionId)
      },
      error: (err: any) => {
        console.log(err.error.message)
      }
    })
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
