import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edad } from 'src/app/interfaces/Edad';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-edad',
  templateUrl: './edad.page.html',
  styleUrls: ['./edad.page.scss'],
})
export class EdadPage implements OnInit {

  id:any
  edad: Edad = {
    type: ""
  }


  constructor(private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getEdad(this.id)
  }

  volver(){
    this.router.navigate(['/admin/create-edad']);
  }

  cancel(){
    this.setOpen(false)
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getEdad(id : any){
    this.tournamentServ.getEdad(id).subscribe({
      next: (res : any) => {
        this.edad = res.edad
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  editEdad(form : any){
    const formulario = {
      type: form.edad.value
    }
    this.tournamentServ.editEdad(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        window.location.href = `/admin/edad/${this.id}`
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  eliminarEdad(){
    this.tournamentServ.deleteEdad(this.id).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        setTimeout(() => {
          window.location.href = '/create-edad'
        }, 600)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }
}
