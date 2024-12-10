import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.page.html',
  styleUrls: ['./home-jugador.page.scss'],
})
export class HomeJugadorPage implements OnInit {

constructor(private router:Router) { }

ngOnInit() {
}

logOut() {
  localStorage.removeItem('st_1892@121');  // Elimina el token del localStorage
  this.router.navigate(['/login'] , { replaceUrl: true });     
}

}
