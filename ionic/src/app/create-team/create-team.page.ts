import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  selectedFile: File | null = null;
  form: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamNotes: ['', Validators.required],
      isTeamListActive: ['', Validators.required],
      socialMedia: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/user/home'])
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

  createTeam(){
    const formulario = {
      teamName: this.form.value.teamName,
      teamNotes: this.form.value.teamNotes,
      isTeamListActive: this.form.value.isTeamListActive,
      socialMedia: this.form.value.socialMedia
    }
    this.userService.createTeam(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        setTimeout(() => {
          window.location.href = '/user/home'
        }, 500)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

}
