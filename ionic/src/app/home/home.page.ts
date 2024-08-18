import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor( private router:Router, private sharedService: SharedService) { }
  @ViewChild(IonModal) modal!: IonModal ;

  ngOnInit() {
  
  }

  ir() {
    this.router.navigate(['/create-team']);
    
  }


  

}
