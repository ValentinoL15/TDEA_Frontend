import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/Empresa';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  form:FormGroup
  empresas: Empresa[] = []

  constructor(private router: Router, private tournamentServ: TournamentService, private fb: FormBuilder, private notifyServ: NotifyService) { 
    this.form = this.fb.group({
      dueno: ['', Validators.required],
      razonSocial: ['', Validators.required],
      cuit: ['', Validators.required],
      condicionTributaria: ['', Validators.required],
      tipoFactura: ['', Validators.required],
      adress: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getEmpresas();
    const message = localStorage.getItem('successMessage');
    
    if (message) {
      // Mostrar el mensaje
      this.notifyServ.success(message);
      
      // Limpiar el localStorage para que no aparezca de nuevo
      localStorage.removeItem('successMessage');
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/admin/admin-home'])
  }

  goEmpresa(id:any){
        this.router.navigate([`/admin/edit-empresa/${id}`])
  }

  getEmpresas(){
    this.tournamentServ.getEmpresas().subscribe({
      next: (res : any) => {
        this.empresas = res.empresas
      },
      error: (err) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  crearTorneo(){
    const formulario: Empresa = {
      dueno: this.form.value.dueno,
      razonSocial: this.form.value.razonSocial,
      cuit: this.form.value.cuit,
      condicionTributaria: this.form.value.condicionTributaria,
      tipoFactura: this.form.value.tipoFactura,
      adress: this.form.value.adress,
      mail: this.form.value.mail,
      phone: this.form.value.phone
    }
    this.tournamentServ.createEmpresa(formulario).subscribe({
      next: (res : any) => {
        window.location.href = `admin/empresa`
      },
      error: (err) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

}
