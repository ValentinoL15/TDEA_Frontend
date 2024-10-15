import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.page.html',
  styleUrls: ['./tabs2.page.scss'],
})
export class Tabs2Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToAdminHome() {
    this.router.navigate(['/admin/admin-home']); // Cambia a la ruta correcta
  }

  navigateToCreateCategory() {
    this.router.navigate(['/create-category']); // Asegúrate de que esta ruta esté bien configurada
  }

}
