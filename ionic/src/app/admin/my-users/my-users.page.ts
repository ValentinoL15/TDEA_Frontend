import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-users',
  templateUrl: './my-users.page.html',
  styleUrls: ['./my-users.page.scss'],
})
export class MyUsersPage implements OnInit {

constructor(private userService: UserService, private notifyService: NotifyService, private router: Router) { }

users: User[] = []

ngOnInit() {
  this.getUsuarios()
}

getUsuarios(){
  this.userService.getUsers().subscribe({
    next: (res : any) => {
      this.users = res.users
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

goAdmin(){
  this.router.navigate(['/create-admin'])
}

volver(){
  this.router.navigate(['/admin/admin-home'])
}

}
