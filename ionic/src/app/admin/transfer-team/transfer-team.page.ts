import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/Team';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer-team',
  templateUrl: './transfer-team.page.html',
  styleUrls: ['./transfer-team.page.scss'],
})
export class TransferTeamPage implements OnInit {

constructor(private UserSerice : UserService, private notifyService: NotifyService, private router: Router) { }

teams: Team[] = []

ngOnInit() {
  this.getTransfers()
}

getTransfers(){
  this.UserSerice.getTransferencias().subscribe({
    next: (res : any) => {
      this.teams = res.transferencias
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

aceptarTransferencia(form : any){
  const formulario = {
    _id: form._id.value,
  }
  this.UserSerice.aceptarTransfer(formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getTransfers()
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

rechazarTransferencia(form : any){
  const formulario = {
    _id: form._id.value,
  }
  this.UserSerice.rechazarTransfer(formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getTransfers()
    },
    error: (err : any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

volver(){
  this.router.navigate(['/admin/admin-home'])
}

}
