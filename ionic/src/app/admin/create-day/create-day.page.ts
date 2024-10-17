import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Day } from 'src/app/interfaces/Day';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.page.html',
  styleUrls: ['./create-day.page.scss'],
})
export class CreateDayPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  form:FormGroup
  id:any
  dias:Day[] = [];
  tournament: Tournament = {
    _id: "",
    nameFantasy: "",
    ano: 0,
    campeonato:{
      type: ""
    } ,
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
    daysTournament: [{
      _id: "",
      day: {
        _id: "",
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
        type: []
      }
    }],
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0
  }

  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      day: ['', Validators.required]
    })
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getTournament()
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss( 'cancel');
  }

  volver(){
    this.router.navigate([`/admin/tournaments/${this.id}`])
  }

  getTournament(){
    this.tournamentServ.getTournament(this.id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound;
        console.log(this.tournament)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

goDay(id: any) {
    this.router.navigate([`/day/${this.id}/${id}`]);
}

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
