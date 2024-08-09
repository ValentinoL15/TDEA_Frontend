import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/user/home'])
  }

}
