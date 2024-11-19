import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

email: string = ''
constructor(private authService: AuthService, private router: Router, private notifyService: NotifyService){}

ngOnInit(): void {
}

submitEmail(){
  this.authService.forgotPassword(this.email).subscribe({
    next: (res:any) => {
      setTimeout(() => {
        this.notifyService.success(res.message)
      }, 1000)
      this.router.navigate(['/login'])
    }, 
    error: (error) => {
      console.log(error)
    }
  })
}

volver() {
  const token = localStorage.getItem("st_1892@121");
  if (token) {
    this.router.navigate(['/user/profile']);
  } else {
    this.router.navigate(['/login']);
  }
}



}
