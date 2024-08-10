import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private loadingCtrl: LoadingController, private router:Router, private sharedService: SharedService) { }

  isTeam: boolean = false;
  newTeam: any[] = [];

  ngOnInit() {
    this.sharedService.isTeam$.subscribe((value) => {
      this.isTeam = value;
    });
    this.sharedService.newTeam$.subscribe((team) => {
      this.newTeam = team;
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }

  ir(){
    this.loadingCtrl.getTop()
    this.router.navigate(['/create-team']);
  }
  
  cancel(){
    const modal = document.querySelector('ion-modal');
    modal?.dismiss(null, 'cancel');
  }


}
