import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/List';
import { Player } from '../interfaces/Player';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.page.html',
  styleUrls: ['./edit-player.page.scss'],
})
export class EditPlayerPage implements OnInit {

id:any
player: Player = {
  _id: "",
  firstName: "",
  lastName: "",
  dni:0,
  shirtNumber: 0,
  nacimiento: "yyyy-mm-dd",
  ownerList: "",
  picturePlayer: ""
}
players: Player[] = []

    //BUTTON
    public alertImagen = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.editImage()
        },
      },
    ];
    setResults(ev : any) {
      console.log(`Dismissed with role: ${ev.detail.role}`);
    }
  
    //INPUTS
    public alertInputImage = [
      {
        placeholder: 'Elige una foto',
        name: 'photo',
        type: 'file'
      },
    ];
  
    selectedImage: File | null = null


  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getPlayer(this.id)
  }

  goList(id:any){
    this.router.navigate([`/players/${this.player.ownerList}`])
  }

  getPlayer(id:any){
    this.userService.getPlayer(id).subscribe({
      next: (res: any) => {
        this.player = res.player
        console.log(this.player)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getPlayers(id:any){
    this.userService.getPlayers(id).subscribe({
      next: (res: any) => {
        this.players = res.listOfPlayers;
        console.log(this.players)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  editPlayer(id:any, form:any){
    const formulario = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
    }
    this.userService.editPlayer(id,formulario).subscribe({
      next: (res: any) => {
        window.location.href = `/players/${this.player.ownerList}`
        this.notifyService.success(res.message)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  editEdad(){
    this.notifyService.error('No es posible cambiar la fecha de Nacimiento')
  }

  editDni(){
    this.notifyService.error('No es posible cambiar el DNI')
  }

  adjustDate(date: Date): Date {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }

  eliminarJugador(id:any){
    this.userService.deletPlayer(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        window.location.href = `/players/${this.player.ownerList}`
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  editImage(){
    const form = new FormData();
    form.append('image',  this.selectedImage as Blob);
    this.userService.editPhotoPlayer(this.id, form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getPlayer(this.id)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  onFileSelectedImage(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
    console.log('Archivo seleccionado:', file);
  }


}
