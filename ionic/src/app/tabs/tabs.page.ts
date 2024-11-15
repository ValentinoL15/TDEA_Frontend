import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Team } from '../interfaces/Team';
import { NotifyService } from '../services/notify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    teamImage:"",
    active: false,
    deudas: [{
        _id: "",
        belongTournament: {
            _id: "",
            nameFantasy: "",
        },
        belongToList: {
            _id: "",
            nameList: ""
        },
        amount: 0,
}]
  }
  constructor(private userService: UserService, private notifyService: NotifyService, private router:Router ) {}

  ngOnInit(): void {
    this.getDeudas()
  }


  getDeudas(){
    this.userService.getDeuda().subscribe({
      next: (res : any) => {
        this.team = res.team
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }


}
