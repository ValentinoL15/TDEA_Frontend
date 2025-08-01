import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-formats-images',
  templateUrl: './formats-images.page.html',
  styleUrls: ['./formats-images.page.scss'],
})
export class FormatsImagesPage implements OnInit {

constructor(private route : ActivatedRoute, private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService) { }

id:any
tournament: Tournament = {
    nameFantasy: "",
    ano: 0,
    order: 0,
    awardsImage: "",
    campeonato:{
      _id: "",
      type: ""
    },
    edad: {
      _id: "",
      type: ""
    },
    daysTournament: [{
      _id: "",
      day: {
        _id: "",
        type: ""
      },
      sede: {
        images: []
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
      time: []
    }],
    teamSubscribed: [{
      _id: "",
      preferences: []
    }],
    rangeAgeSince: 0,
    rangeAgeUntil: 0,
    ageDescripcion: "",
    category: {
      _id: "",
      categoryName : "",
    },
    format: {
      _id:"",
    formatName: "",
    minPlayers: 0,
    maxPlayers: 0
    },
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
    tournamentDate: new Date(),
    tournamentNotes: "",
    isTournamentMasculine: false,
    isTournamentActive: false,
    tarifaInscripcion: 0,
    tarifaPartido: 0,
    cupos: 0,
    formatImage: ""
  }
selectedFile: File | null = null;
selectedFile2: File | null = null;
selectedFile3: File | null = null;

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getTournament(this.id)
}

volver(){
  this.router.navigate([`/admin/tournaments/${this.id}`]);
}

getTournament(id:any){
  this.tournamentServ.getTournament(id).subscribe({
    next: (res : any) => {
      this.tournament = res.tournamentFound
      console.log(this.tournament)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile = file;

  this.editImageFormat();
}

onFileSelected2(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile2 = file;

  this.editImageTorneo()
}

onFileSelected3(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile3 = file;

  this.editImageAwards()
}

onSelectImage() {
  const fileInput = document.getElementById('file-input-format') as HTMLInputElement;
  fileInput.click(); // Simula el clic en el input de archivo oculto
}

onSelectImage2() {
  const fileInput = document.getElementById('file-input-torneo') as HTMLInputElement;
  fileInput.click(); // Simula el clic en el input de archivo oculto
}

onSelectImage3() {
  const fileInput = document.getElementById('file-input-awards') as HTMLInputElement;
  fileInput.click(); // Simula el clic en el input de archivo oculto
}

editImageFormat(){
  const form = new FormData();
  form.append('image', this.selectedFile as Blob);

  this.tournamentServ.editFormatImage(this.id, form).subscribe({
    next: (res : any) => {
      this.getTournament(this.id)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

editImageTorneo(){
  const form = new FormData();
  form.append('image', this.selectedFile2 as Blob);

  this.tournamentServ.editTorneoImage(this.id, form).subscribe({
    next: (res : any) => {
      this.getTournament(this.id)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

editImageAwards(){
  const form = new FormData();
  form.append('image', this.selectedFile3 as Blob);

  this.tournamentServ.editAwardsImage(this.id, form).subscribe({
    next: (res : any) => {
      this.getTournament(this.id)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

}
