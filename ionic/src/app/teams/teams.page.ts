import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifyService } from '../services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../interfaces/Team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  id:any
  equipo: Team = {
    teamName: "",
    teamNotes: "",
    isTeamListActive: false,
    socialMedia: "",
  }

  constructor(private userService: UserService, private notifyService: NotifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getTeam(this.id)
  }

  goLists(id:any){
    this.router.navigate([`/create-list/${id}`])
  }

  volver(){
    this.router.navigate(['/user/home'])
  }

  getTeam(id:any){
    this.userService.getTeam(id).subscribe({
      next: (res : any) => {
        this.equipo = res.team
      },
      error: (err : any) => {
        console.log(err)
      }
    })
  }


}
