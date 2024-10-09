import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/Empresa';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-create-sede',
  templateUrl: './create-sede.page.html',
  styleUrls: ['./create-sede.page.scss'],
})
export class CreateSedePage implements OnInit {

  id:any
  sedes: Sede[] = []
  form: FormGroup
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
  selectedFile: File | null = null;
  day: any
  startTime: string = "00:00"; // Por defecto
  endTime: string = "00:00";   // Por defecto


  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router, private fb : FormBuilder) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      celular: ['', Validators.required],
      adress: ['', Validators.required],
      barrio: ['', Validators.required],
      socialRed: ['', Validators.required],
      daysAttention: [[], Validators.required],
      encargado: ['', Validators.required],
      dueno: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getSedes(this.id)
    this.getEmpresa(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/edit-empresa/${this.id}`])
  }

  goSede(id:any){
    this.router.navigate([`/sede/${id}`])
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

  getSedes(id : any){
    this.tournamentServ.getSedes(id).subscribe({
      next: (res : any) => {
        this.sedes = res.sedes
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  crearSede(){
    if (this.form.value.daysAttention.length === 0) {
      this.notifyServ.error('Debe seleccionar al menos un día de atención.');
      return;
    }
    const formulario: Sede = {
      name: this.form.value.name,
      alias: this.form.value.alias,
      status: this.form.value.status,
      phone: this.form.value.phone,
      celular: this.form.value.celular,
      adress: this.form.value.adress,
      barrio: this.form.value.barrio,
      socialRed: this.form.value.socialRed,
      daysAttention: this.form.value.daysAttention.map((day: any) => {
        return {
          day: day,  // Aquí, day es simplemente el valor de cada día (como "Lunes", "Martes", etc.)
          start: this.form.value.startTime ? this.form.value.startTime : "00:00",  // Asegúrate de tener las variables startTime y endTime definidas
          end: this.form.value.endTime ? this.form.value.endTime : "00:00"
        };
      }),
      encargado: this.form.value.encargado,
      dueno: this.form.value.dueno
    }
    this.tournamentServ.createSede(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyServ.success(res.message)
        this.getSedes(this.id)
        this.setOpen(false)
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }


}
