import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-add-players-list',
  templateUrl: './add-players-list.page.html',
  styleUrls: ['./add-players-list.page.scss'],
})
export class AddPlayersListPage implements OnInit {

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  form: FormGroup

  id:any
  selectedFile: File | null = null;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      shirtNumber: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

}
