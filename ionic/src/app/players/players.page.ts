import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '../services/notify.service';
import { Player } from '../interfaces/Player';
import { date, format } from "@formkit/tempo"
import { Team } from '../interfaces/Team';
import { AuthService } from '../services/auth.service';
import { PassMarket } from '../interfaces/PassMarket';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  form: FormGroup

  id: any
  list: List = {
    ownerUser: {
      firstName: "",
      lastName: "",
    },
    ownerTeam: {
      _id: ""
    },
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
    teamPicture: "",
    shirtColor: "",
    alternativeShirtColor: "",
    nameList: "",
  }
  player: Player = {
    _id: "",
    firstName: "",
    lastName: "",
    nacimiento: "yyyy-mm-dd",
    pictureAccept: false,
    status: "",
    dni: 0,
    shirtNumber: 0,
    picturePlayer: ""
  }
  team: Team = {
    _id: "",
    teamName: "",
    teamNotes: "",
    socialMedia: "",
    teamImage: "",
    pictureAccept: false,
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
  user = {
    _id: "",
    completedFormMarket: false
  }
  players: Player[] = []
  selectedFile: File | null = null;
  selectedSegment: string = 'players'; // Valor inicial del segmento
  times = [
    "00:00", "00:15", "00:30", "00:45",
    "01:00", "01:15", "01:30", "01:45",
    "02:00", "02:15", "02:30", "02:45",
    "03:00", "03:15", "03:30", "03:45",
    "04:00", "04:15", "04:30", "04:45",
    "05:00", "05:15", "05:30", "05:45",
    "06:00", "06:15", "06:30", "06:45",
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00", "20:15", "20:30", "20:45",
    "21:00", "21:15", "21:30", "21:45",
    "22:00", "22:15", "22:30", "22:45",
    "23:00", "23:15", "23:30", "23:45",
  ];
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup
  mercado: PassMarket = {
      _id: "",
      playerImage: "",
      nombre: "",
      apellido: "",
      position: "",
      nacimiento: "",
      horarios: [{
        dia: "",
        hora: [],
      }]
  }
  playersMarket: PassMarket[] = []
  myPlayer: PassMarket = {
    _id: "",
    playerImage: "",
    nombre: "",
    apellido: "",
    position: "",
    nacimiento: "",
    horarios: [{
      _id: "",
      dia: "",
      hora: [],
    }]
  }
  diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  dia: string[] = []



  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService, private AuthService: AuthService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {   
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      shirtNumber: ['', Validators.required]
    })
    this.form2 = this.fb.group({
      horarios: this.fb.array([]),
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[1-9]\\.[0-9]{2}$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required]
    })
    this.form3 = this.fb.group({
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[1-9]\\.[0-9]{2}$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required],
    })
    this.form4 = this.fb.group({
      horarios: this.fb.array([]),
    })
  }

  isModalOpen = false;
  isModalOpen2 = false

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }


  ngOnInit() {
    this.getPlayers()
    this.getUser()
    this.getMarket()
    this.getMyPlayer()
    this.userService.getDeuda().subscribe({
      next: (res: any) => {
        if (res.team && res.team.active) {
          this.team = res.team  // Acceder a las deudas solo si el equipo está activo
        } else {
          console.log('No hay un equipo activo.');
        }
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }
  

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value; // Actualiza el valor según la selección
  }

  goPlayer(id: any) {
    this.router.navigate([`/edit-player/${id}`])
  }

  getUser() {
    this.AuthService.getUser().subscribe({
      next: (res: any) => {
        this.user = res.user
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  getMyPlayer(){
    this.userService.getMyPlayer().subscribe({
      next: (res: any) => {
        this.myPlayer = res.passMarket
        console.log('Jugador actualizado:', this.myPlayer); // Asegúrate de 
        this.form3.patchValue({
          position: this.myPlayer.position || '',
          pieHabil: this.myPlayer.pieHabil || '',
          altura: this.myPlayer.altura || '',
          peso: this.myPlayer.peso || '',
          trayectoria: this.myPlayer.trayectoria || '',
          zona: this.myPlayer.zona || ''
        });
        
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  agregarHorario(id : any, form : any){
    const formulario = {
      dia : form.dia.value,
      hora: form.hora.value
    }
    this.userService.agregarHorario(id, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        this.getMyPlayer()
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  editMyHorario(id:any, form : any){
    const formulario = {
      dia: form.dia.value, // Asegúrate de que estás accediendo correctamente a estos valores
      hora: form.hora.value
    };
  
    console.log('Formulario enviado:', formulario);
    this.userService.editMyHorario(id, formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success('Horario editado con éxito')
        this.getMyPlayer()
        this.getPlayers()
        this.cdr.markForCheck(); // Fuerza la actualización de los inputs
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  deleteMyHorario(id : any){
    this.userService.deleteHorario(id).subscribe({
      next: (res: any) => {
        this.notifyService.success('Horario eliminado con éxito')
        this.getMyPlayer()
        this.getPlayers()
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  updateMyPlayer() {
    if (this.form3.valid) {
      const updatedPlayer = {
        ...this.form3.value,
      };
      this.userService.editMyPlayer(updatedPlayer).subscribe({
        next: (res: any) => {
          this.notifyService.success('Player updated successfully');
          this.getMyPlayer();
        },
        error: (err: any) => {
          this.notifyService.error(err.error.message);
        }
      });
    } else {
      this.notifyService.error('Please fill all required fields correctly');
    }
  }

  getPlayers() {
    this.userService.getPlayersTeam().subscribe({
      next: (res: any) => {
        this.players = res.listOfPlayers;
        console.log(this.players);
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  getMarket(){
    this.userService.getMarket().subscribe({
      next: (res: any) => {
        this.playersMarket = res.playersMarket
        console.log(this.playersMarket)
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }
  crearJugador(form: any) {
    const formData = new FormData();
    formData.append('firstName', this.form.get('firstName')?.value);
    formData.append('lastName', this.form.get('lastName')?.value);
    formData.append('dni', this.form.get('dni')?.value);
    formData.append('nacimiento', this.form.get('nacimiento')?.value);
    formData.append('image', this.selectedFile as Blob);
    this.userService.crearJugador(formData).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message)
        this.getPlayers()
        this.form.reset()
        this.selectedFile = null;

        // Resetear manualmente el campo de archivo
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';  // Resetear el valor del input file
        }
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })

  }

  validateInputAltura(event: any): void {
    let input = event.target.value;

    // Eliminar cualquier carácter que no sea número o punto
    input = input.replace(/[^0-9.]/g, '');

    // Si solo tiene un número, automáticamente agregar el punto
    if (input.length === 1) {
      input += '.';
    }

    // Validar la estructura para tener solo hasta dos números después del punto
    const regex = /^\d(\.\d{0,2})?$/;

    if (!regex.test(input)) {
      // Si no pasa la validación, corregir el texto para ajustarse a la estructura X.XX
      const parts = input.split('.');
      if (parts[1]) {
        input = `${parts[0]}.${parts[1].substring(0, 2)}`;
      } else {
        input = parts[0];
      }
    }

    // Evitar más de 3 números total (1 antes del punto, 2 después)
    const splitValues = input.split('.');
    if (splitValues[0].length > 1) {
      splitValues[0] = splitValues[0].substring(0, 1);
      input = splitValues.join('.');
    }

    // Actualizar el FormControl para la vista
    this.form.get('altura')?.setValue(input, { emitEvent: false });

    // Asegurar que el DOM refleje los cambios
    event.target.value = input;
  }

  removeDayTournament(index: number) {
    this.horarios.removeAt(index);
  }

  get horarios(): FormArray {
    return this.form2.get('horarios') as FormArray;
  }

  addDayTournament() {
    const dayGroup = new FormGroup({
      dia: new FormControl(''),
      hora: new FormControl('')
    });

    this.horarios.push(dayGroup); // Agrega el nuevo FormGroup al FormArray
  }

  ingresarMarket(){
    const formulario = {
      horarios: this.form2.value.horarios.map((horario: any) => ({
        dia: horario.dia,
        hora: horario.hora
      })),
      peso : this.form2.value.peso,
      altura: this.form2.value.altura,
      position: this.form2.value.position,
      pieHabil: this.form2.value.pieHabil,
      trayectoria: this.form2.value.trayectoria,
      zona: this.form2.value.zona,
    }
    this.userService.ingresarMercado(formulario).subscribe({
      next: (res : any) => {
        this.notifyService.success(res.message)
        this.getUser()
        this.getMarket()
        this.getMyPlayer()
        this.modal.dismiss(null, 'cancel');
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}

cancel2(){
  this.modal.dismiss(null, 'cancel');
}

  validateInput(event: KeyboardEvent) {
    const allowedChars = /^[0-9.]$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log('Archivo seleccionado:', file);
  }

  restartPlayers() {
    window.location.href = '/user/players'
  }


}
