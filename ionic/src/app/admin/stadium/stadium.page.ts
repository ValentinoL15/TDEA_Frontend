import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stadium } from 'src/app/interfaces/Stadium';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.page.html',
  styleUrls: ['./stadium.page.scss'],
})
export class StadiumPage implements OnInit {

  id:any
  stadium: Stadium = {
    _id: "",
    code: "",
    type: 0,
    length: 0,
    width:0,
    roof: "",
    grass: "",
    punctuaction: 0
  }


  constructor(private router: Router, private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getStadium(this.id)
    })
    
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/create-stadium/${this.id}`])
  }

  getStadium(id : any){
    this.tournamentServ.getStadium(id).subscribe({
      next: (res : any) => {
        this.stadium = res.estadio
        console.log(this.stadium)
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  editStadium(id:any,form : any){
    const formulario = {
      code: form.code.value,
      type: form.type.value,
      length: form.length.value,
      width: form.width.value,
      roof: form.roof.value,
      grass: form.grass.value,
      punctuaction: form.punctuaction.value
    }
    console.log(formulario)
    this.tournamentServ.editStadium(id,formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)
        this.getStadium(this.id)
        this.setOpen(false)
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

}
