import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
parametro: any = ''
id:any
actionTaken : boolean = false
user = {
  password: "",
  confirmPassword: ""
}

constructor(private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router,
  private notifyService: NotifyService) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
    const actionTakenStorage = localStorage.getItem(`actionTaken_${this.id}`);
    if (actionTakenStorage) {
      this.actionTaken = true;
    }
  })
}

resetPassword(formulario:any){
  if(this.user.password != this.user.confirmPassword){
    return this.notifyService.error("Las contraseñas no coinciden")
  }
  console.log(this.user.password)
  this.authService.resetPassword(this.id, formulario.value.password).subscribe({
    next: (res : any) => {
      setTimeout(() => {
        this.notifyService.success("Contraseña restablecida con éxito")
      }, 1000)
      this.router.navigate(['/login'])
      this.actionTaken = true; // Marcar la acción como tomada
      // Guardar el estado de la acción en el almacenamiento local
      localStorage.setItem(`actionTaken_${this.parametro}`, 'true')
    },
    error: (error) => {
      console.log(error);
    }
  })
}



}
