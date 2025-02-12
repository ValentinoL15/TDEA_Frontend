import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-sede-images',
  templateUrl: './sede-images.page.html',
  styleUrls: ['./sede-images.page.scss'],
})
export class SedeImagesPage implements OnInit {

id:any
sede: Sede = {
  _id: "",
  belongToEmpresa: "",
  name : "",
  alias: "",
  status: "",
  phone: 0,
  celular: 0,
  adress: "",
  barrio: "",
  socialRed: "",
  daysAttention: [
    {
      day: "",
      start: "",
      end: ""
    },
  ],
  encargado: "",
  dueno: "",
  latitude: 0,
  altitude:0,
  images: ['']
}
selectedFile: File | null = null
selectedIndex: number | null = null;

constructor(private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private tournamentServ: TournamentService) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id']
  })
  this.getSede()
}

getSede(){
  this.tournamentServ.getSede(this.id).subscribe({
    next: (res: any) => {
      this.sede = res.sede
    },
    error: (err: any) => {
      this.notifyService.error(err.error.message)
    }
  })
}

openFileInput(index: number) {
  // Abrir el input de archivo al hacer clic en el botón
  const fileInput = document.getElementById('file-input-' + index) as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

onFileSelected(event: any, index: number) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.uploadNewImage(file, index);
  }
}

uploadNewImage(file: File, index: number) {
  const formData = new FormData();
  formData.append('image', file, file.name);
  formData.append('index', index.toString());  // Añadir el índice de la imagen que se va a actualizar

  // Llamar a la API para subir la imagen
  this.tournamentServ.editPhotoSede(this.id, formData).subscribe({
    next: (res: any) => {
      const newImageUrl = res.newImageUrl; // URL de la nueva imagen retornada por el backend

      // Actualizamos la imagen en el array
      if (this.selectedIndex !== null) {
        const newImages = [...this.sede.images];
        newImages.splice(this.selectedIndex, 1, newImageUrl); // Reemplazamos la imagen seleccionada
        this.sede.images = newImages;
      }
      this.getSede()

      this.notifyService.success('Imagen actualizada correctamente');
    },
    error: (err: any) => {
      this.notifyService.error('Error al subir la imagen');
    }
  });
}

deleteImage(index:number){
  this.tournamentServ.deletePhotoSede(this.id, index).subscribe({
    next: (res: any) => {
      this.sede.images.splice(index, 1);
      this.getSede()
      this.notifyService.success(res.message)
    },
    error: (err: any) => {
      this.notifyService.error('Error al eliminar la imagen');
    }
  })
}
}


