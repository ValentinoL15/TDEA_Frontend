import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Edad } from 'src/app/interfaces/Edad';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-edad',
  templateUrl: './create-edad.page.html',
  styleUrls: ['./create-edad.page.scss'],
})
export class CreateEdadPage implements OnInit {

form:FormGroup
edades: Edad[] = [];
isLoading: boolean = true; // Variable para controlar el estado de carga

constructor(private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService, private fb: FormBuilder) { 
  this.form = this.fb.group({
    type: ['', Validators.required]
  })
}

ngOnInit() {
  this.getEdades()
}

isModalOpen = false;
setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

cancel(){
  this.setOpen(false)
}

volver(){
  this.router.navigate(['/admin/admin-home']);
}

goEdad(id:any){
  this.router.navigate([`/edad/${id}`])
}

getEdades(){
  this.tournamentServ.getEdades().subscribe({
    next: (res: any) => {
      this.edades = res.edades;
      this.isLoading = false; // Datos cargados, desactivar el spinner
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

createEdad(){
  const formulario = {
    type: this.form.value.type
  }
  this.tournamentServ.createEdad(formulario).subscribe({
    next: (res : any) => {
      this.notifyService.success(res.message)
      this.getEdades()
      this.setOpen(false)
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

drop(event: CdkDragDrop<string[]>): void {
  moveItemInArray(this.edades, event.previousIndex, event.currentIndex);
}

}
