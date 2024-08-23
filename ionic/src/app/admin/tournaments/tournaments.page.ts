import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Format } from 'src/app/interfaces/Format';
import { Tournament } from 'src/app/interfaces/Tournament';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

  id:any
  categories: Category[] = [];
  formats: Format[] = []
  tournament: Tournament = {
    nameFantasy: "",
    category: {
      _id: "",
      categoryName : "",
      ageLimiter : 0
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
    isTournamentActive: false
  }
  constructor(private tournamentServ: TournamentService, private notifyService: NotifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getTournament(this.id)
    })
    this.getCategories()
    this.getFormats()
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/admin/home-tournament'])
  }

  getCategories(){
    this.tournamentServ.getCategories().subscribe({
      next: (res : any) => {
        this.categories = res.categories
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }
  
  getFormats(){
    this.tournamentServ.getFormats().subscribe({
      next: (res : any) => {
        this.formats = res.formats
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getTournament(id:any){
    this.tournamentServ.getTournament(id).subscribe({
      next: (res : any) => {
        this.tournament = res.tournamentFound
        this.tournament.tournamentDate = this.adjustDate(new Date(this.tournament.tournamentDate));
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  adjustDate(date: Date): Date {
    // Ajuste para compensar el desfase de la zona horaria
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + offset * 60000);
    return adjustedDate;
  }

  editTournament(id:any, form:any){
    const formulario = {
      nameFantasy: form.nameFantasy.value,
      tournamentDate: form.tournamentDate.value,
      category: form.category.value,
      format: form.format.value,
      isTournamentMasculine: form.isTournamentMasculine.value,
      isTournamentActive: form.isTournamentActive.value,
      tournamentNotes: form.tournamentNotes.value
    };
    this.tournamentServ.editTournaments(id, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        this.getTournament(id)
        this.setOpen(false)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
    
  }



}
