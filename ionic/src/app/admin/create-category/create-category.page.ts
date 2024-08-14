import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Category } from 'src/app/interfaces/Category';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

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
  categorias: Category[] = [];

  constructor(private router: Router , private formBuilder: FormBuilder, private tournamentServ : TournamentService, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      categoryName: ['', Validators.required],
      ageLimiter: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getCategoryes();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  createCategory(){
    const form: Category = {
      categoryName : this.form.value.categoryName,
      ageLimiter : this.form.value.ageLimiter
    }
    this.tournamentServ.createCategory(form).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.categorias.push(res.category)
        this.cancel()
      },
      error: (err) => {
        console.log(err);
        this.notifyService.error(err.error.message)
      }
    })
  }

  getCategoryes(){
    this.tournamentServ.getCategories().subscribe({
      next: (res : any) => {
        this.categorias = res.categories || [];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
