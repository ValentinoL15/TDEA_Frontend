import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Edad } from 'src/app/interfaces/Edad';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edad',
  templateUrl: './create-edad.page.html',
  styleUrls: ['./create-edad.page.scss'],
})
export class CreateEdadPage implements OnInit {

form:FormGroup
edades: Edad[] = [];
isLoading: boolean = true; // Variable para controlar el estado de carga

constructor(private router: Router, private tournamentServ: TournamentService, private notifyService: NotifyService, private fb: FormBuilder, private UserService: UserService) { 
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
  this.router.navigate([`/admin/edad/${id}`])
}

getEdades(){
  this.tournamentServ.getEdades().subscribe({
    next: (res: any) => {
      this.edades = res.edades;
      this.edades = res.edades.sort((a:any, b:any) => a.order - b.order); // Aseguramos que se ordenen por el campo 'order'
      this.isLoading = false; // Datos cargados, desactivar el spinner
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
      this.isLoading = false;
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
      window.location.href = `/admin/create-edad`
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

drop(event: CdkDragDrop<string[]>): void {
  moveItemInArray(this.edades, event.previousIndex, event.currentIndex);

  // Enviar el nuevo orden de edades al backend
  this.tournamentServ.updateAgeOrder(this.edades.map(a => a._id)).subscribe({
    next: (res: any) => {
      console.log(res)
    },
    error: (err : any) => {
      this.notifyService.error('Error al actualizar el orden');
      console.error(err);
    }
  });
}

}
