import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  equipoNombre: string = "";
  instagramCuenta: string = "";
  descripcionTexto: string = "";
  selectedFile: File | null = null;

  isTeam: boolean = false;

  newTeam: any[] = [];
  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/user/home'])
  }

  saveForm(){
    this.newTeam.push(this.equipoNombre)
    this.newTeam.push(this.instagramCuenta)
    this.newTeam.push(this.descripcionTexto)
    this.newTeam.push(this.selectedFile)
    this.sharedService.setNewTeam(this.newTeam);  // Compartir el array newTeam
    
    this.isTeam = true;
    this.sharedService.setIsTeam(this.isTeam);
    this.router.navigate(['/user/home']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

}
