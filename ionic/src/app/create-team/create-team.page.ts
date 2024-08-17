import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  selectedFile: File | null = null;
  form: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      
    })
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/user/home'])
  }

  saveForm(){
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

}
