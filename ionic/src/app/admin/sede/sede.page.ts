import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
})
export class SedePage implements OnInit {

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
    altitude:0
  }
  map: any;
  marker: any;

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

  selectedFile: File | null = null;
  selectedDays: string[] = [];

  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router, private alertController: AlertController) { }
  
  dias = {
    daysAttention: ['Lunes', 'Miercoles', 'Viernes'] // Inicializar con días seleccionados
  };

  allDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getSede(this.id)
  }

  getAvailableDays(): string[] {
    // Filtra los días que ya están seleccionados
    return this.allDays.filter(day => !this.sede.daysAttention.some(d => d.day === day));
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  volver(){
    this.router.navigate([`/admin/create-sede/${this.sede.belongToEmpresa}`])
  }

  goStadium(){
    this.router.navigate([`/admin/create-stadium/${this.id}`])
  }

  goSede(){
    this.router.navigate([`/admin/sede-horarios/${this.id}`])
  }

  getSede(id: string) {
    this.tournamentServ.getSede(id).subscribe({
        next: (res: any) => {
            this.sede = res.sede;
            this.selectedDays = this.sede.daysAttention.map(day => day.day);
            if (this.sede.latitude && this.sede.altitude) {
          setTimeout(() => {
            this.loadMap(this.sede.latitude || 0, this.sede.altitude || 0);
          }, 500); // Retraso de 500ms para asegurar que el DOM está listo
        } else {
          console.warn('No hay latitud y longitud en el torneo');
        }
        },
        error: (err) => {
            console.error(err);
        }
    });
}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

  editSede(form: any) {
    // Actualiza daysAttention antes de crear el formulario
    this.updateDaysAttention();

    const formulario = {
        name: form.name.value,
        alias: form.alias.value,
        adress: form.adress.value,
        socialRed: form.socialRed.value,
        daysAttention: this.sede.daysAttention, // Ahora esto tendrá los días seleccionados
        phone: form.phone.value,
        celular: form.celular.value,
        encargado: form.encargado.value,
        dueno: form.dueno.value,
        barrio: form.barrio.value,
        status: form.status.value
    };

    this.tournamentServ.editSede(this.id, formulario).subscribe({
        next: (res: any) => {
            this.notifyServ.success(res.message);
            window.location.href = `/admin/sede/${this.id}`;
        },
        error: (err: any) => {
            this.notifyServ.error(err.error.message);
        }
    });
}

updateDaysAttention() {
  // Suponiendo que tienes una forma de obtener los horarios de inicio y fin
  const start = '09:00'; // Lógica para obtener este valor
  const end = '17:00'; // Lógica para obtener este valor

  // Actualiza daysAttention según los días seleccionados
  this.sede.daysAttention = this.selectedDays.map(day => ({
      day: day,
      start: start,
      end: end
  }));
}
async eliminarSede() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta sede con sus estadios?',
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
            this.tournamentServ.deleteSede(this.id).subscribe({
              next: (res: any) => {
                this.notifyServ.success(res.message);
                setTimeout(() => {
                  window.location.href = `/admin/create-sede/${this.sede.belongToEmpresa}`;
                }, 500); 
              },
              error: (err: any) => {
                this.notifyServ.error(err.error.message);
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }

    position = {
    lat: this.sede.latitude,
    lng: this.sede.altitude
  }

  loadMap(lat: number, lng: number) {
      if (!lat || !lng) {
        console.error('Latitud o longitud inválidas:', lat, lng);
        return;
      }
  
      // Espera hasta que el elemento #map esté disponible
      setTimeout(() => {
        this.map = L.map('map2').setView([lat, lng], 12); // Centra en la ubicación guardada
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
  
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }, 500);
    }




}
