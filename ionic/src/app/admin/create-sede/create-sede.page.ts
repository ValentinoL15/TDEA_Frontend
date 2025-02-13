import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/Empresa';
import { Sede } from 'src/app/interfaces/Sede';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-sede',
  templateUrl: './create-sede.page.html',
  styleUrls: ['./create-sede.page.scss'],
})
export class CreateSedePage implements OnInit,OnDestroy {

  id:any
  sedes: Sede[] = []
  form: FormGroup
  empresa: Empresa = {
    dueno: "",
    razonSocial: "",
    cuit: 0,
    condicionTributaria: "",
    tipoFactura: "",
    adress: "",
    mail: "",
    phone: 0
  }
  selectedFiles: File[] = []; 
  day: any
  startTime: string = "00:00"; // Por defecto
  endTime: string = "00:00";   // Por defecto
  map: any;
  marker: any;
  address: string = '';


  constructor(private route: ActivatedRoute, private tournamentServ: TournamentService, private notifyServ: NotifyService, private router: Router, private fb : FormBuilder, private http: HttpClient, private notifyService: NotifyService) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      celular: ['', Validators.required],
      socialRed: ['', Validators.required],
      daysAttention: [[], Validators.required],
      encargado: ['', Validators.required],
      dueno: ['', Validators.required],
      latitude: [null, Validators.required], // Añadir latitud
      altitude: [null, Validators.required],  // Añadir altitud
      address: new FormControl(''), // Campo para la dirección
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getSedes(this.id)
    this.getEmpresa(this.id)
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen) {
      setTimeout(() => {
        this.initMap();
        setTimeout(() => {
          this.map.invalidateSize(); // 🔥 Forzar ajuste del mapa
        }, 500);
      }, 300);
    } else {
      this.destroyMap();
    }
  }
  
  searchAddress(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    return this.http.get(url);
  }
  
  onAddressChange() {
    const address = this.form.get('address')?.value;
    if (!address) return;
  
    this.searchAddress(address).subscribe((results: any) => {
      if (results.length > 0) {
        const lat = results[0].lat;
        const lng = results[0].lon;
  
        this.form.patchValue({ latitude: lat, longitude: lng });
        this.addMarker(lat, lng);
        this.map.setView([lat, lng], 12);
      } else {
        this.notifyService.error("Por favor selecciona una dirección válida")
      }
    });
  }

  volver(){
    this.router.navigate([`/admin/edit-empresa/${this.id}`])
  }

  goSede(id:any){
    this.router.navigate([`/admin/sede/${id}`])
  }  

  getEmpresa(id:any){
    this.tournamentServ.getEmpresa(id).subscribe({
      next: (res : any) => {
        this.empresa = res.empresa
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  getSedes(id : any){
    this.tournamentServ.getSedes(id).subscribe({
      next: (res : any) => {
        this.sedes = res.sedes
      },
      error: (err : any) => {
        this.notifyServ.error(err.error.message)
      }
    })
  }

  crearSede() {
    if (!this.form.value.latitude || !this.form.value.altitude) {
      this.notifyServ.error("Por favor, selecciona una ubicación válida.");
      return;
    }
    const formData = new FormData();
  
    formData.append("name", this.form.value.name);
    formData.append("alias", this.form.value.alias);
    formData.append("status", this.form.value.status);
    formData.append("phone", this.form.value.phone);
    formData.append("celular", this.form.value.celular);
    formData.append("socialRed", this.form.value.socialRed);
    formData.append("encargado", this.form.value.encargado);
    formData.append("dueno", this.form.value.dueno);
    formData.append("latitude", this.form.value.latitude);
    formData.append("altitude", this.form.value.altitude);
  
    // Agregar días de atención
    this.form.value.daysAttention.forEach((day: string, index: number) => {
      formData.append(`daysAttention[${index}][day]`, day);
      formData.append(`daysAttention[${index}][start]`, this.form.value.startTime ? this.form.value.startTime : "00:00");
      formData.append(`daysAttention[${index}][end]`, this.form.value.endTime ? this.form.value.endTime : "00:00");
    });
  
    this.selectedFiles.forEach((file: File) => {
      formData.append("image", file);  // Usar el nombre "image" para cada archivo si así lo espera tu backend.
    });
  
    this.tournamentServ.createSede(this.id, formData).subscribe({
      next: (res: any) => {
        this.notifyServ.success(res.message);
        window.location.href = `/admin/create-sede/${this.id}`;
      },
      error: (err: any) => {
        this.notifyServ.error(err.error.message);
      }
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);  // Convertir `FileList` a un array para manejar múltiples archivos.
    console.log('Archivos seleccionados:', this.selectedFiles);
  }

  initMap() {
      this.map = L.map('map').setView([-34.603722, -58.381592], 10);
    
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    
      this.map.invalidateSize(); // 🔥 IMPORTANTE: Forzar redibujado del mapa
    
      // Escuchar clics en el mapa
      this.map.on('click', (e: any) => {
        this.addMarker(e.latlng.lat, e.latlng.lng);
      });
    }
    
  
    addMarker(lat: number, lng: number) {
      // Si ya hay un marcador, lo eliminamos
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
  
      // Agregar un nuevo marcador en la posición seleccionada
      this.marker = L.marker([lat, lng]).addTo(this.map);
  
      // Actualizar los valores en el formulario
      this.form.patchValue({
        latitude: lat,
        altitude: lng
      });
    }
  
    private destroyMap() {
      if (this.map) {
        this.map.remove();
        this.map = null!;
      }
    }
  
    ngOnDestroy() {
      this.destroyMap();
    }


}
