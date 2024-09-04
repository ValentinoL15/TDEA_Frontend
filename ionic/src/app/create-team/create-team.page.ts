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
    const formData = new FormData();
    formData.append('teamName', this.form.get('teamName')?.value);
    formData.append('teamNotes', this.form.get('teamNotes')?.value);
    formData.append('socialMedia', this.form.get('socialMedia')?.value);
    formData.append('image', this.selectedFile as Blob);
    this.userService.createTeam(formData).subscribe({
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
