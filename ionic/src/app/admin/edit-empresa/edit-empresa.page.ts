import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/Empresa';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.page.html',
  styleUrls: ['./edit-empresa.page.scss'],
})
export class EditEmpresaPage implements OnInit {

  id:any
  empresa: Empresa = {
    dueno: "",
    razonSocial: "",
    cuit: 0,
    condicionTributaria: "",
    tipoFactura: "",
    adress: "",
    mail: "",
    phone: 0
  }
  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getEmpresa(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/empresa'])
  }

  goSede(){
    this.router.navigate([`/create-sede/${this.id}`])
  }

  getEmpresa(id:any){
    this.tournamentServ.getEmpresa(id).subscribe({
      next: (res : any) => {
        this.empresa = res.empresa
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  editEmpresa(form:any){
    const formulario = {
      dueno: form.dueno.value,
      razonSocial: form.razonSocial.value,
      cuit: form.cuit.value,
      condicionTributaria: form.condicionTributaria.value,
      tipoFactura: form.tipoFactura.value,
      adress: form.adress.value,
      mail: form.mail.value,
      phone: form.phone.value
    }
    this.tournamentServ.editEmpresa(this.id, formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)
        this.getEmpresa(this.id)
        this.setOpen(false)
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  eliminarEmpresa(){
    this.tournamentServ.deleteEmpresa(this.id).subscribe({  
      next: (res : any) => {
        localStorage.setItem('successMessage', res.message);
        window.location.href = '/empresa'
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }



}
