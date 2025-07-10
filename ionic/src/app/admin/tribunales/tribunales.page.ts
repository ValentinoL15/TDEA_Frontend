import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tribunales',
  templateUrl: './tribunales.page.html',
  styleUrls: ['./tribunales.page.scss'],
})
export class TribunalesPage implements OnInit {
id:any;
player_id:any

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.player_id = params['player_id'];
    })
  }

}
