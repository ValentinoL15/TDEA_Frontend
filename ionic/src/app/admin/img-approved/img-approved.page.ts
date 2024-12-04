import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Picture } from 'src/app/interfaces/Picture';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-img-approved',
  templateUrl: './img-approved.page.html',
  styleUrls: ['./img-approved.page.scss'],
})
export class ImgApprovedPage implements OnInit {
  images: Picture[] = [];
  teamImages: Picture[] = [];
  playerImages: Picture[] = [];
  listImages: Picture[] = [];

  constructor(private userService: UserService, private notifyService: NotifyService) {}

  ngOnInit() {
    this.getImagenes();
  }

  getImagenes() {
    this.userService.getImages().subscribe({
      next: (res: any) => {
        this.images = res.pictures;
        // Filtrar imágenes según el tipo
        this.teamImages = this.images.filter(img => img.teamPicture);
        this.playerImages = this.images.filter(img => img.playerPicture);
        this.listImages = this.images.filter(img => img.listPicture);
        console.log('Imágenes de equipo:', this.teamImages);
    console.log('Imágenes de jugador:', this.playerImages);
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  aprobar(id: any) {
    this.userService.approvedPicture(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  eliminarTeamPicture(id : any){
    this.userService.rejectPicture(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  aprobarList(id : any){
    this.userService.approvedPictureList(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  eliminarPictureList(id : any){
    this.userService.rejectPictureList(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  aprobarPlayer(id: any) {
    this.userService.playerApproved(id).subscribe({
      next: (res: any) => {
        console.log('Aprobando imagen con ID:', id);
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  eliminarPlayerPicture(id : any){
    this.userService.rejectPlayerPicture(id).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  aprobarSeleccionados(tipo: 'team' | 'list' | 'player') {
    let imagenes: Picture[];
    let aprobarFn: (id: any) => any;

    switch(tipo) {
      case 'team':
        imagenes = this.teamImages;
        aprobarFn = this.userService.approvedPicture.bind(this.userService);
        break;
      case 'list':
        imagenes = this.listImages;
        aprobarFn = this.userService.approvedPictureList.bind(this.userService);
        break;
      case 'player':
        imagenes = this.playerImages;
        aprobarFn = this.userService.playerApproved.bind(this.userService);
        break;
    }

    const seleccionados = imagenes.filter(img => img.selected);

    if (seleccionados.length === 0) {
      this.notifyService.error('No se han seleccionado imágenes para aprobar');
      return;
    }

    const observables = seleccionados.map(img => aprobarFn(img._id));

    forkJoin(observables).subscribe({
      next: (results) => {
        this.notifyService.success(`Se han aprobado ${results.length} imágenes`);
        this.getImagenes(); // Refrescar imágenes
      },
      error: (err) => {
        this.notifyService.error('Hubo un error al aprobar las imágenes');
      }
    });
  }

}
