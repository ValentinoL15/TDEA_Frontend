import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
})
export class SedePage implements OnInit {

  id:any
  sede: Sede = {
    belongToEmpresa: "",
    name : "",
    alias: "",
    status: "",
    phone: 0,
    celular: 0,
    adress: "",
    barrio: "",
    socialRed: "",
    daysAttention: [],
    encargado: "",
    dueno: ""
  }
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getSede(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/create-sede/${this.sede.belongToEmpresa}`])
  }

  goStadium(){
    this.router.navigate([`/create-stadium/${this.id}`])
  }

  getSede(id:any){
    this.tournamentServ.getSede(id).subscribe({
      next: (res:any) => {
        this.sede = res.sede
      },
      error: (err:any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

  editSede(form:any){
    const formulario = {
      name: form.name.value,
      alias: form.alias.value,
      adress: form.adress.value,
      socialRed: form.socialRed.value,
      daysAttention: form.daysAttention.value,
      phone: form.phone.value,
      celular: form.celular.value,
      encargado: form.encargado.value,
      dueno: form.dueno.value,
      barrio: form.barrio.value,
      status: form.status.value
    }
    this.tournamentServ.editSede(this.id, formulario).subscribe({
      next: (res:any) => {
        this.notifyServ.success(res.message)
        this.getSede(this.id)
        this.setOpen(false)
      },
      error: (err:any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }


}
