import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Format } from 'src/app/interfaces/Format';
import { TournamentService } from 'src/app/services/tournament.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-format',
  templateUrl: './format.page.html',
  styleUrls: ['./format.page.scss'],
})
export class FormatPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  id:any;
  format: Format = {
    formatName: "",
    minPlayers: 0,
    maxPlayers: 0,
  };
  
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private router: Router, private notifyService: NotifyService) { 
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getFormato(this.id)
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  volver(){
    this.router.navigate(['/create-format'])
  }



  getFormato(id:any){
    this.tournamentServ.getFormat(id).subscribe({
      next: (res : any) => {
        this.format = res.format
        console.log(this.format)
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }


  updateFormat(id: any) {
    // Validación adicional de minPlayers y maxPlayers en el frontend
    if (this.format.minPlayers >= this.format.maxPlayers) {
      this.notifyService.error('El número mínimo de jugadores debe ser menor que el número máximo de jugadores');
      return;
    }
  
    // Enviar el formato actualizado al backend
    this.tournamentServ.editFormat(id, this.format).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getFormato(this.id);
        setTimeout(() => {
          window.location.href = `/create-format`;
        }, 500);
      },
      error: (err) => {
        this.notifyService.error(err.error.message);
      }
    });
  }

  eliminarFormato(id:any){
    this.tournamentServ.deleteFormat(id).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message);
        window.location.href = '/create-format'
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }


}
