import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Category } from 'src/app/interfaces/Category';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {
  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;
  form:FormGroup
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  categories: Category[] = [];

  constructor(private router: Router , private formBuilder: FormBuilder, private tournamentServ : TournamentService, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      categoryName: ['', Validators.required],
      ageLimiter: ['', Validators.required]
    })
  }
  
  ngOnInit() {
    this.tournamentServ.categories$.subscribe((res) => {
    if (res) {
      this.categories = res;
    }
  });

  // Solo al inicio
  this.tournamentServ.getCategories();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  volver(){
    this.router.navigate(['/admin/admin-home'])
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  goCategory(id:any){
    this.router.navigate([`/admin/category/${id}`])
  }

  createCategory(){
    const form: Category = {
      categoryName : this.form.value.categoryName
    }
    this.tournamentServ.createCategory(form).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.categories.push(res.category)
        this.cancel()
        this.form.reset();
      },
      error: (err) => {
        console.log(err);
        this.notifyService.error(err.error.message)
      }
    })
  }

  /*getCategoryes(){
    this.tournamentServ.getCategories().subscribe({
      next: (res : any) => {
        this.categorias = res.categories
        this.categorias = res.categories.sort((a:any, b:any) => a.order - b.order);
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }*/



  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    // Reorganiza las categorías en memoria
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  
    // Enviar el nuevo orden al backend
    this.tournamentServ.updateCategoryOrder(this.categories.map(c => c._id)).subscribe({
      next: (res: any) => {
        this.notifyService.success('Orden actualizado correctamente');
      },
      error: (err) => {
        this.notifyService.error('Error al actualizar el orden');
        console.error(err);
      }
    });
  }

}
