import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Asegúrate de tener el servicio para verificar el estado
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-pending-pay',
  templateUrl: './pending-pay.page.html',
  styleUrls: ['./pending-pay.page.scss'],
})
export class PendingPayPage implements OnInit {
  paymentStatus: string = 'Estamos procesando tu pago. Por favor, espera...';
  private interval: any;
  tournamentId: any;
  teamListId: any;

  constructor(private router: Router, private userService: UserService, private notifyServie: NotifyService) {}

  ngOnInit() {
    this.userService.getPending().subscribe({
      next: (res : any) => {
        this.notifyServie.warning(res.message)
      },
      error: (err: any) => {
        this.notifyServie.error(err.error.message)
      }
    })
  }




  volver() {
    this.router.navigate(['/user/home']);
  }
}
