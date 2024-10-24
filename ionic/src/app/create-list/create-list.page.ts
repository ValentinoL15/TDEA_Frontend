import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { List } from '../interfaces/List';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../services/tournament.service';
import { Division } from '../interfaces/Division';
import { Campeonato } from '../interfaces/Campeonato';



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
  form: FormGroup
  campeonatos: Campeonato[] = []
  selectedFile: File | null = null;
  showColorDropdown = false;
  colors = ["#C62828", "#304FFE", "#FFFF00", "#FF6F00", "#00C853", "#212121", "#FAFAFA", "#6A1B9A"];
  selectedColor: string | null = null;
  showAlternativeColorDropdown = false;
  selectedAlternativeColor: string | null = null;
  color: string = '#127bdc'

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private formBuilder: FormBuilder, private tournamentServ: TournamentService) { 
    this.form = this.formBuilder.group({
      nameList: ['', Validators.required],
      shirtColor: ['#808080', Validators.required], // Valor predeterminado
      alternativeShirtColor: ['#808080', Validators.required],
      typeAlineacion: ['', Validators.required]
    });
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
    this.getLists()
    this.getCampeonatos()
  }
  
  goList(id:any, alineacion: any){
    this.router.navigate([`/alineaciones/${id}/${alineacion}`])
  }
  getLists(){
    this.userService.getAllLists().subscribe({
      next: (res : any) => {
        this.lists = res.listsOwner
        console.log(this.lists)
      },
      error: (err) => {
        console.log(err.error.message);
      }
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

  createList(){
    const formData = new FormData();
    formData.append('nameList', this.form.get('nameList')?.value);
    formData.append('shirtColor', this.form.get('shirtColor')?.value);
    formData.append('alternativeShirtColor', this.form.get('alternativeShirtColor')?.value);
    formData.append('typeAlineacion', this.form.get('typeAlineacion')?.value);
    formData.append('image', this.selectedFile as Blob);
    this.userService.createList(formData).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        window.location.href = `/create-list/${this.id}`
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }


}
