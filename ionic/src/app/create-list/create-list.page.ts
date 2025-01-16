import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { List } from '../interfaces/List';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../services/tournament.service';
import { Division } from '../interfaces/Division';
import { Campeonato } from '../interfaces/Campeonato';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  
  id:any;
  lists: List[] = []
  list: List = {
    shirtColor: "",
    typeAlineacion: 0,
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
    teamPicture: ""
  }
  isFormEdited: boolean = false
  isTeamEdited: boolean = false
  selectedFile2: File | null = null;
  form: FormGroup
  campeonatos: Campeonato[] = []
  selectedFile: File | null = null;
  showColorDropdown = false;
  colors = ["#C62828", "#304FFE", "#FFFF00", "#FF6F00", "#00C853", "#212121", "#FAFAFA", "#6A1B9A"];
  selectedColor: string | null = null;
  showAlternativeColorDropdown = false;
  selectedAlternativeColor: string | null = null;
  color: string = '#127bdc'
  form2: FormGroup
  myLists: List[] = []
  myListActive : List = {
    nameList: "",
    typeAlineacion: 0,
    teamPicture: "",
    listActive: false
  }
  listaSeleccionada: List | null = null; 
  selectedFile3: File | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private formBuilder: FormBuilder, private tournamentServ: TournamentService, private alertController: AlertController) { 
    this.form = this.formBuilder.group({
      nameList: ['', Validators.required],
      hasShirtTitular: [null, Validators.required],
      hasShirtSuplente: [null, Validators.required],
      shirtColor: ['', Validators.required], // Valor predeterminado
      alternativeShirtColor: ['', Validators.required],
      typeAlineacion: ['', Validators.required]
    });
    this.form2 = this.formBuilder.group({
      nameList: ['', Validators.required],
      hasShirtTitular: [null, Validators.required],
      hasShirtSuplente: [null, Validators.required],
      shirtColor: ['', Validators.required], // Valor predeterminado
      alternativeShirtColor: ['', Validators.required],
      typeAlineacion: ['', Validators.required]
    })
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  toggleColorDropdown() {
    this.showColorDropdown = !this.showColorDropdown;
  }

  toggleAlternativeColorDropdown() {
    this.showAlternativeColorDropdown = !this.showAlternativeColorDropdown;
  }

  selectShirtColor(color: string) {
    this.form.patchValue({ shirtColor: color });
    this.showColorDropdown = false; // Cierra el dropdown después de seleccionar
  }

  // Método para seleccionar el color alternativo
  selectAlternativeShirtColor(color: string) {
    this.selectedAlternativeColor = color;
    this.form.patchValue({ alternativeShirtColor: color });
    this.showAlternativeColorDropdown = false; // Cierra el dropdown después de seleccionar
  }

  onColorChange(event: Event) {
    const target = event.target as HTMLInputElement; // Asegúrate de que sea un HTMLInputElement
    if (target && target.value) {
      this.form.patchValue({ shirtColor: target.value });
      console.log("Color seleccionado:", target.value);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getMyListActive()
    this.getCampeonatos()
    this.getLists()
    this.getMyLists()
    this.userService.getMyListUpdatedListener().subscribe(() => {
      this.getMyListActive()
    })
    this.userService.getMyListEliminatedUpdate().subscribe(() => {
      this.getLists()
      this.getMyLists()
      this.getMyListActive()
    })
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

  getMyLists(){
    this.userService.getAllLists().subscribe({
      next: (res: any) => {
        this.myLists = res.myLists;
        console.log("mi listasss", this.myLists)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getLists(){
    this.userService.getMyList().subscribe({
      next: (res : any) => {
        this.lists = res.listsOwner
        console.log(this.lists)
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

  getMyListActive(){
    this.userService.getMyListActive().subscribe({
      next: (res : any) => {
        this.myListActive = res.list
        console.log("ACITVEAD",this.myListActive)
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

  isMyListActiveEmpty(): boolean {
    return (
      !this.myListActive || // Comprueba si es null o undefined
      Object.keys(this.myListActive).length === 0 || // Verifica si no tiene propiedades
      !this.myListActive.listActive // Verifica si no está activo
    );
  }

  cambiarListActive(listId : any){
    this.userService.cambiarListActive(listId).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getLists()
        this.getMyListActive()
        this.getMyLists()
    },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  onListChange(listId: any) {
    this.listaSeleccionada = this.myLists.find(e => e._id === listId) || null;
    this.cambiarListActive(listId)
  }

  editLista(form: any){
    const formulario = {
      nameList: form.nameList.value,
      _id : form._id.value,
      hasShirtTitular: form.hasShirtTitular.value,
      hasShirtSuplente: form.hasShirtSuplente.value,
      shirtColor: form.shirtColor?.value || '#FFFFFF', // Asignar valor por defecto si no existe
      alternativeShirtColor: form.alternativeShirtColor?.value || '#080807',
    }
    this.userService.editList(this.id,formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getLists()
        this.getMyListActive()
        this.getMyLists()
        this.isFormEdited = false;
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  isModalOpen2 = false;

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  createList(){
    const formData = new FormData();
    const hasShirtTitular = this.form2.get('hasShirtTitular')?.value;
    const hasShirtSuplente = this.form2.get('hasShirtSuplente')?.value;
    if (hasShirtTitular === null ) {
      this.notifyService.error('Por favor, selecciona si tiene remera titular.');
      return; // Detener la ejecución si hay campos vacíos
    }
    if (hasShirtSuplente === null) {
      this.notifyService.error('Por favor, selecciona si tiene remera suplente.');
      return; // Detener la ejecución si hay campos vacíos
    }
    formData.append('nameList', this.form2.get('nameList')?.value);
    formData.append('hasShirtTitular', this.form2.get('hasShirtTitular')?.value);
    formData.append('hasShirtSuplente', this.form2.get('hasShirtSuplente')?.value);
    formData.append('shirtColor', this.form2.get('shirtColor')?.value);
    formData.append('alternativeShirtColor', this.form2.get('alternativeShirtColor')?.value);
    formData.append('image', this.selectedFile3 as Blob);
    
    this.userService.createList(formData).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getLists()
        this.getMyListActive()
        this.getMyLists()
        this.setOpen2(false)
        this.form2.reset()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  onFileSelected3(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile3 = file;
    console.log('Archivo seleccionado:', file);
  }

  onShirtTitularChange(list: any) {
    if (!list.hasShirtTitular) {
      list.shirtColor = null; // Limpia el color si no tiene remera titular
    }
  }

  onShirtSuplenteChange(list: any) {
    if (!list.hasShirtSuplente) {
      list.alternativeShirtColor = null; // Limpia el color si no tiene remera suplente
    }
  }
  

  goList2(id:any, alineacion: any){
    this.router.navigate([`/alineaciones/${id}/${alineacion}`])
  }

  onSelectImage2() {
    const fileInput = document.getElementById('file-inputs') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo oculto
  }

  onFileSelected2(event : any){
    const file : File = event.target.files[0]
    this.selectedFile2 = file
    console.log('Archivo seleccionado:', file);

    if (file) {
      this.editImage(); // Llama a la función para editar la imagen
    }
  }

  editImage(){
    const form = new FormData();
    form.append('image',  this.selectedFile2 as Blob);
    this.userService.editPhotoList(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getLists()
        this.getMyListActive()
        this.getMyLists()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  onFormChange() {
    this.isFormEdited = true;
  }

  onTeamChange() {
    this.isTeamEdited = true;
  }

  async presentAlertImagen2() {
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

  deletePhoto2(){
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

  goList(id : any){
    this.router.navigate([`/user/list/${id}`])
  }

}
