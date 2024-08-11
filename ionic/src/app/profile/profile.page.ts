import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('st_1892@121');  // Elimina el token del localStorage
    this.router.navigate(['/login'] , { replaceUrl: true });     
  }

}
