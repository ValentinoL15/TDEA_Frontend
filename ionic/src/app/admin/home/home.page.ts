import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

isAdmin: boolean = false

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Token decodificado:', decodedToken); // Depuración

        if (decodedToken.rol.includes('ADMIN')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.isAdmin = false; // Evitar que se muestre la interfaz de admin en caso de error
      }
    } else {
      console.log('No se encontró token.');
      this.isAdmin = false;
    }
  }

goFormats(){
  this.router.navigate(['/admin/create-format'])
}

goCategories(){
  this.router.navigate(['/admin/create-category'])
}

goChampions(){
  this.router.navigate(['/admin/create-campeonato'])
}

goEdades(){
  this.router.navigate(['/admin/create-edad'])
}

goStadiums(){
  this.router.navigate(['/admin/empresa'])
}

goUsers(){
  this.router.navigate(['/admin/my-users'])
}

goImg(){
  this.router.navigate(['/admin/img-approved'])
}

cerrarSesion(){
  localStorage.removeItem('token');
  window.location.href = `/login`;
}

}
