import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { Category } from 'src/app/interfaces/Category';
import { FormGroup } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  id:any;
  category: Category = {
    categoryName : ""
  }

  constructor(private route : ActivatedRoute, private router: Router, private torunamentServ : TournamentService, private notifyService : NotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getCategory(this.id)
    })
    
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate(['/admin/create-category'])
  }

  getCategory(id:any){
    this.torunamentServ.getCategory(id).subscribe({
      next: (res:any) => {
        this.category = res.category
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateCategory(id:any, form: any){
    const formulario = {
      categoryName: form.categoryName.value,
      ageLimiter: form.ageLimiter.value
    } 
    console.log(formulario)
    this.torunamentServ.editCategory(id, formulario).subscribe({
      next: (res:any) => {
        this.notifyService.success(res.message)
        window.location.href = "/admin/create-category"
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  deleteCategory(id:any){
    this.torunamentServ.deleteCategory(id).subscribe({
      next: (res:any) => {
        this.notifyService.success(res.message)
        window.location.href = "/admin/create-category"
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }


}
