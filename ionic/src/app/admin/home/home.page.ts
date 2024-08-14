import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

goFormats(){
  this.router.navigate(['/create-format'])
}

goCategories(){
  this.router.navigate(['/create-category'])
}

cerrarSesion(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}