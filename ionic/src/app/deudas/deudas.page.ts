import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { Team } from '../interfaces/Team';
import { List } from '../interfaces/List';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss'],
})
export class DeudasPage implements OnInit {
  id:any
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
        nameFantasy: ""
      },
      belongToList: {
        _id: "",
        nameList: ""
      },
      amount: 0
    }]
  }
  constructor(private userService: UserService, private notifyService: NotifyService) { }

  ngOnInit() {
    this.userService.getDeuda().subscribe({
      next: (res : any) => {
        this.team = res.team
        console.log(this.team)
      },
      error: (err : any) => {
        this.notifyService.error(err.message)
      }
    })
  }


}
