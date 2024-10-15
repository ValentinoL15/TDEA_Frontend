import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stadium } from 'src/app/interfaces/Stadium';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-create-stadium',
  templateUrl: './create-stadium.page.html',
  styleUrls: ['./create-stadium.page.scss'],
})
export class CreateStadiumPage implements OnInit {

  id:any
  stadiums: Stadium[] = []
  form: FormGroup


  constructor(private router: Router, private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      code: ['', Validators.required],
      type: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      roof: ['', Validators.required],
      grass: ['', Validators.required],
      punctuaction: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getStadiums(this.id)
  }

  volver(){
    this.router.navigate([`/admin/sede/${this.id}`]);
    this.form.reset()
  }

  goStadium(){
    this.router.navigate([`/admin/stadium/${this.id}`])
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getStadiums(id:any){
  this.tournamentServ.getStadiums(id).subscribe({
    next: (res : any) => {
      this.stadiums = res.estadios
    },
    error: (err: any) => {
      this.notifyServ.error(err.error.message)
    }
  })
  }

  createStadium(){
    const formulario: Stadium = {
      code: this.form.value.code,
      type: this.form.value.type,
      length: this.form.value.length,
      width: this.form.value.width,
      roof: this.form.value.roof,
      grass: this.form.value.grass,
      punctuaction: this.form.value.punctuaction
    }
    console.log(formulario)
    this.tournamentServ.createStadium(this.id, formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)

      },
      error: (err: any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

}
