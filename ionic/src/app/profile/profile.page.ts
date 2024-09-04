import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id:any
  usuario: User = {
    firstName: "",
    docNumber: 0,
    gender: "",
    phone: 0,
    birthday: "yyyy-mm-dd",
    email: "",
    password: ""
  }

  public formattedBirthday: string = '';

  constructor(private router : Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerUser()
  }

  logOut() {
    localStorage.removeItem('st_1892@121');  // Elimina el token del localStorage
    this.router.navigate(['/login'] , { replaceUrl: true });     
  }

  obtenerUser(){
    this.authService.getUser().subscribe({
      next: (res : any) => {
        this.usuario = res.user;
        if (res.user.birthday) {
          // Formatear la fecha a 'YYYY-MM-DD'
          this.usuario.birthday = new Date(res.user.birthday).toISOString().split('T')[0];
        }
        
      },
      error: (err : any) => {
        console.log(err);
      }
    })
  }
  
  goUser(){
    this.router.navigate([`/edit-profile`])
  }


}
