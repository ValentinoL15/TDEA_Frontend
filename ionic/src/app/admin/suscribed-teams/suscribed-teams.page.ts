import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/interfaces/List';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-suscribed-teams',
  templateUrl: './suscribed-teams.page.html',
  styleUrls: ['./suscribed-teams.page.scss'],
})
export class SuscribedTeamsPage implements OnInit {

  constructor(private route : ActivatedRoute, private notifyService: NotifyService, private router: Router, private tournamentService: TournamentService) { }

  id:any
  lists: List[] = []


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getLists(this.id)
  }

  volver(){
    this.router.navigate([`/tournaments/${this.id}`])
  }

  goPlayers(team: any, id : any){
    this.router.navigate([`/players-subscribed/${team}/${id}`])
  }

  getLists(id : any){
    this.tournamentService.getListSubscribed(this.id).subscribe({
      next: (res : any) => {
        this.lists = res.teamSubscribed
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

}
