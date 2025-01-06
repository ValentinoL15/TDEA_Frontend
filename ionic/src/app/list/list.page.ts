import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { IonicModule, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TournamentService } from '../services/tournament.service';
import { Division } from '../interfaces/Division';
import { FilterPipe } from '../filter.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Team } from '../interfaces/Team';
import { AlertController } from '@ionic/angular';
import { Campeonato } from '../interfaces/Campeonato';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true, // Marca el componente como standalone si es necesario
  imports: [CommonModule, FormsModule, IonicModule, FilterPipe, ReactiveFormsModule] // Importa los módulos y pipes necesarios
})

export class ListPage implements OnInit {

  public alertButtons = [
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
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev : any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private userService:UserService, private tournamentServ: TournamentService, private alertController: AlertController, private fb: FormBuilder) {
    this.form = this.fb.group({
      hasShirtTitular: [null], // o false si es booleano
      hasShirtSuplente: [null],
      shirtColor: [null],
      alternativeShirtColor: ["#FFFFFF"],
      typeAlineacion: [null]
    });
   }
  @ViewChild(IonModal) modal!: IonModal;
  id:any
  
  campeonatos: Campeonato[] = []
  list: List = {
    ownerUser: { firstName: "",
      lastName: "",
    },
    ownerTeam: {
      _id: ""
    },
    typeAlineacion: 0,
    teamPicture: "",
    hasShirtTitular: false,
    hasShirtSuplente: false,
    pictureAccept: false,
    status: "",
    shirtColor: "",
    alineacion: {
      _id: "",
    teamList: "",
    arquero: {
      _id: "",
    firstName: "",
    },
    defensor1: {
      _id: "",
      firstName: "",
    },
    defensor2: {
      _id: "",
      firstName: "",
    },
    defensor3: {
      _id: "",
      firstName: "",
    },
    defensor4: {
      _id: "",
      firstName: "",
    },
    mediocampista1: {
      _id: "",
      firstName: "",
    },
    mediocampista2: {
      _id: "",
      firstName: "",
    },
    mediocampista3: {
      _id: "",
      firstName: "",
    },
    delantero1: {
      _id: "",
      firstName: "",
    },
    delantero2: {
      _id: "",
      firstName: "",
    },
    delantero3: {
      _id: "",
      firstName: "",
    },
    },
    alternativeShirtColor: "",
    nameList: "",
  }
  name:string = ""
  idOwnerTeam:any
  divisionId:any
  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    active: false
  }

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
      name: 'image',
      type: 'file'
    },
  ];

  selectedFile: File | null = null


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getLista(this.id)
    this.getCampeonatos()

  }

  goAlineacion(){
    this.router.navigate([`/alineaciones/${this.id}/${this.list.alineacion?._id}`])
  }

  getCampeonatos(){
    this.tournamentServ.getCampeonatos().subscribe({
      next: (res : any) => {
        this.campeonatos = res.campeonatos
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

  volver(){
    this.router.navigate([`/user/create-list`])
  }

  getLista(id:any) {
    this.userService.getList(id).subscribe({
      next: (res : any) => {
        this.list = res.list;
        this.name = `${this.list.ownerUser?.firstName} ${this.list.ownerUser?.lastName}`;
        this.idOwnerTeam = `${this.list.ownerTeam?._id}`
        console.log(this.list)
        this.form.patchValue({
          hasShirtTitular: this.list.hasShirtTitular,
          hasShirtSuplente: this.list.hasShirtSuplente,
          shirtColor: this.list.shirtColor,
          alternativeShirtColor: this.list.alternativeShirtColor,
          typeAlineacion: this.list.typeAlineacion
        });
      },
      error: (err: any) => {
        console.log(err.error.message)
      }
    })
  }

  goList(id:any, alineacion: any){
    this.router.navigate([`/alineaciones/${id}/${alineacion}`])
  }

  editLista(){
    const formulario = {
      hasShirtTitular: this.form.value.hasShirtTitular,
      hasShirtSuplente: this.form.value.hasShirtSuplente,
      shirtColor: this.form.value.shirtColor,
      alternativeShirtColor: this.form.value.alternativeShirtColor,
      typeAlineacion: this.form.value.typeAlineacion
    }
    this.userService.editList(formulario).subscribe({
      next: (res : any) => {
        window.location.href = `/alineaciones/${this.id}/${this.list.alineacion?._id}`
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  

  async deleteList(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres borrar esta lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario ha cancelado, no hacer nada
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // El usuario ha confirmado, proceder con la eliminación
            this.userService.eliminarLista(id).subscribe({
              next: (res: any) => {
                this.notifyService.success(res.message);
                setTimeout(() => {
                  window.location.href = `/user/create-list`;
                }, 500); 
              },
              error: (err: any) => {
                this.notifyService.error(err.error.message);
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  editImage(){
    const form = new FormData();
    form.append('image',  this.selectedFile as Blob);
    this.userService.editPhotoList(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getLista(this.id)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  onFileSelected(event : any){
    const file : File = event.target.files[0]
    this.selectedFile = file
    console.log('Archivo seleccionado:', file);

    if (file) {
      this.editImage(); // Llama a la función para editar la imagen
    }
  }

  onSelectImage() {
    const fileInput = document.getElementById('file-inputs') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo oculto
  }

  async presentAlertImagen() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres cambiar la imagen del equipo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.editImage(); // Llama a la función para editar la imagen
          }
        }
      ]
    });
  
    await alert.present();
  }

  deletePhoto(){
    this.userService.deletePhotoLista().subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        window.location.href = `/user/list/${this.id}`
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

}
