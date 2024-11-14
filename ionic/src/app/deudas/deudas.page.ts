import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { Team } from '../interfaces/Team';
import { List } from '../interfaces/List';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss'],
})
export class DeudasPage implements OnInit {
  id:any
  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    teamImage:"",
    active: false,
    deudas: [{
      _id: "",
      belongTournament: {
        _id: "",
        nameFantasy: ""
      },
      belongToList: {
        _id: "",
        nameList: ""
      },
      amount: 0
    }]
  }
  constructor(private userService: UserService, private notifyService: NotifyService, private alertController: AlertController) { }

  ngOnInit() {
    this.userService.getDeuda().subscribe({
      next: (res : any) => {
        this.team = res.team
        console.log(this.team)
      },
      error: (err : any) => {
        this.notifyService.error(err.message)
      }
    })
  }

    async confirmInscription(deudaId: any, teamListId: any, tournamentId: any) {
      console.log(deudaId, teamListId, tournamentId)
    const alert = await this.alertController.create({
      header: 'Confirmar Inscripción',
      message: `¿Estás seguro de inscribir la lista: ${teamListId} en este torneo?`,
      inputs: [
        {
          name: 'userPrice',
          type: 'number',
          placeholder: 'Ingresa el monto a pagar',
          min: 0 // Puedes agregar restricciones como mínimo valor
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Inscripción cancelada');
          }
        },
        {
          text: 'Inscribirme',
          handler: (data) => {
            const userPrice = parseFloat(data.userPrice); // Convertir a número
          console.log('Monto ingresado:', userPrice);
          if (isNaN(userPrice) || userPrice <= 0) {
            this.notifyService.error("Por favor ingrese un monto válido");
            return; // Detener la ejecución si el monto no es válido
          }
          console.log(deudaId);
          
          this.inscribirse(deudaId, teamListId, userPrice, tournamentId); // Pasar `userPrice` al método `inscribirse`
        }
        }
      ]
    });
  
    await alert.present();
  }

  inscribirse(deudaId: any, teamListId: any, userPrice: number,tournamentId: any ) {
    const payload = { teamListId, paid: userPrice, tournamentId }; // Incluir el monto pagado en el payload
    this.userService.ingresarTorneo(deudaId, payload).subscribe({
      next: (res: any) => {
        if (res.redirectUrl) {
          // Redirige al usuario a la URL de Mercado Pago
          window.location.href = res.redirectUrl;
        } else {
          console.log('Error: No se recibió una URL de redirección');
        }
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    });
  }
  


}