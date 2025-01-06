import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { TournamentService } from '../services/tournament.service';
import { AlertController } from '@ionic/angular';
import { List } from '../interfaces/List';
import { Tournament } from '../interfaces/Tournament';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

constructor(private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService, private alertController: AlertController) { }

id:any
torneos: Tournament[] = []
lists: List[] = []


ngOnInit() {
  this.getTournaments()
  this.getLists()
}

volver(){
  this.router.navigate([`/user/home`])
}

goTournament(id : any){
  this.router.navigate([`/tournament/${id}`])
}


getTournaments(){
  this.tournamentServ.getTournaments().subscribe({
    next: (res : any) => {
      this.torneos = res.tournaments
      this.torneos = res.tournaments.sort((a:any, b:any) => a.order - b.order);
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

getLists(){
  this.userService.getMyList().subscribe({
    next: (res : any) => {
      this.lists = res.listsOwner
      console.log(this.lists)
    },
    error: (err) => {
      console.log(err.error.message);
    }
  })
}

drop(event: CdkDragDrop<string[]>): void {
  // Reorganiza las categorías en memoria
  moveItemInArray(this.torneos, event.previousIndex, event.currentIndex);

  // Enviar el nuevo orden al backend
  this.tournamentServ.updateCategoryOrder(this.torneos.map(c => c._id)).subscribe({
    next: (res: any) => {
      console.log(res)
    },
    error: (err) => {
      this.notifyService.error('Error al actualizar el orden');
      console.error(err);
    }
  });
}

}
