import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

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
    altitude:0,
    images: [''],
  }
  map: any;
  marker: any;
  address: string = '';

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

  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router, private alertController: AlertController, private http: HttpClient) { }
  
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

  editSede() {
    const formulario = {
      name: this.sede.name,
      alias: this.sede.alias,
      adress: this.sede.adress,
      socialRed: this.sede.socialRed,
      daysAttention: this.selectedDays,
      phone: this.sede.phone,
      celular: this.sede.celular,
      encargado: this.sede.encargado,
      dueno: this.sede.dueno,
      barrio: this.sede.barrio,
      status: this.sede.status,
      latitude: this.sede.latitude,  // 📌 Enviar nueva latitud
      altitude: this.sede.altitude   // 📌 Enviar nueva longitud
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
    setTimeout(() => {
      if (this.map) {
        this.map.remove();
      }
  
      this.map = L.map('map2').setView([lat, lng], 12);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      // Agregar marcador en la ubicación actual
      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
  
      // Evento para mover el marcador manualmente
      this.marker.on('dragend', (event: any) => {
        const newLatLng = event.target.getLatLng();
        this.updateLocation(newLatLng.lat, newLatLng.lng);
      });
  
      // Permitir selección de nueva ubicación con clic
      this.map.on('click', (e: any) => {
        this.updateLocation(e.latlng.lat, e.latlng.lng);
      });
  
    }, 500);
  }

  updateLocation(lat: number, lng: number) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
  
    // Permitir mover el marcador después de colocarlo
    this.marker.on('dragend', (event: any) => {
      const newLatLng = event.target.getLatLng();
      this.updateLocation(newLatLng.lat, newLatLng.lng);
    });
  
    // Actualizar valores en la sede
    this.sede.latitude = lat;
    this.sede.altitude = lng;
  }

goImages(id :any){
  this.router.navigate([`/admin/sede-images/${id}`])
}

onAddressChange() {
  if (!this.address) return;

  this.searchAddress(this.address).subscribe((results: any) => {
    if (results.length > 0) {
      const lat = results[0].lat;
      const lng = results[0].lon;

      // 🔥 Mueve el marker a la nueva dirección
      this.addMarker(lat, lng);
      this.map.setView([lat, lng], 12);

      // ✅ Guarda las coordenadas en el objeto sede
      this.sede.latitude = lat;
      this.sede.altitude = lng;
    } else {
      this.notifyServ.error("Por favor selecciona una dirección válida");
    }
  });
}

searchAddress(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  return this.http.get(url);
}

addMarker(lat: number, lng: number) {
  if (this.marker) {
    this.map.removeLayer(this.marker); // Elimina el marker anterior
  }

  this.marker = L.marker([lat, lng]).addTo(this.map); // Crea un nuevo marker
}




}
