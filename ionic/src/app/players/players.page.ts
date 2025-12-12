import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { List } from '../interfaces/List';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '../services/notify.service';
import { Player } from '../interfaces/Player';
import { date, format } from "@formkit/tempo"
import { Team } from '../interfaces/Team';
import { AuthService } from '../services/auth.service';
import { PassMarket } from '../interfaces/PassMarket';
import { User } from '../interfaces/User';

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
    listActive : false
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
  user: User = {
    _id: "",
    completedFormMarket: false,
    firstName: "",
    lastName: "",
    docNumber: 0,
    gender: "",
    phone:0,
    birthday: "",
    birthdayFormatted: "",
    profileImg: "",
    password: "",
    pictureAccept: false,
    status: "",
    email: "",
  }
  players: Player[] = []
  selectedFile: File | null = null;
  selectedFile3: File | null = null;
  selectedSegment: string = 'market'; // Valor inicial del segmento
  playersFiltered: any[] = []; // Jugadores filtrados
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
  mercado: PassMarket = {
      _id: "",
      playerImage: "",
      nombre: "",
      apellido: "",
      position: "",
      nacimiento: "",
      horarios: []
  }
  playersMarket: PassMarket[] = []
  filtros: any = {}; // Objeto para los filtros seleccionados
  myPlayer: PassMarket = {
    _id: "",
    playerImage: "",
    nombre: "",
    apellido: "",
    position: "",
    nacimiento: "",
    horarios: []
  }
  playersList: Player[] = []
  diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  zonas: string[] = ['CABA', 'GBANorte', 'GBAOeste', 'GBASur'];
  posiciones: string[] = ['Delantero', 'Defensor', 'Arquero', 'Mediocampista'];
  dia: string[] = []
  horarioOptions = [
    { value: 'LunesMañana', label: 'Lunes a la Mañana' },
    { value: 'LunesTarde', label: 'Lunes a la Tarde' },
    { value: 'LunesNoche', label: 'Lunes a la Noche' },
    { value: 'MartesMañana', label: 'Martes a la Mañana' },
    { value: 'MartesTarde', label: 'Martes a la Tarde' },
    { value: 'MartesNoche', label: 'Martes a la Noche' },
    { value: 'MiercolesMañana', label: 'Miércoles a la Mañana' },
    { value: 'MiercolesTarde', label: 'Miércoles a la Tarde' },
    { value: 'MiercolesNoche', label: 'Miércoles a la Noche' },
    { value: 'JuevesMañana', label: 'Jueves a la Mañana' },
    { value: 'JuevesTarde', label: 'Jueves a la Tarde' },
    { value: 'JuevesNoche', label: 'Jueves a la Noche' },
    { value: 'ViernesMañana', label: 'Viernes a la Mañana' },
    { value: 'ViernesTarde', label: 'Viernes a la Tarde' },
    { value: 'ViernesNoche', label: 'Viernes a la Noche' },
    { value: 'SabadoMañana', label: 'Sábado a la Mañana' },
    { value: 'SabadoTarde', label: 'Sábado a la Tarde' },
    { value: 'SabadoNoche', label: 'Sábado a la Noche' },
    { value: 'DomingoMañana', label: 'Domingo a la Mañana' },
    { value: 'DomingoTarde', label: 'Domingo a la Tarde' },
    { value: 'DomingoNoche', label: 'Domingo a la Noche' }
  ];

  public alertImagen = [
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
        this.editImage()
      },
    },
  ];
  setResults(ev : any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  public alertImagen2 = [
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
        this.editImage2()
      },
    },
  ];
  setResults2(ev : any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  public alertInputImage = [
    {
      placeholder: 'Elige una foto',
      name: 'image',
      type: 'file'
    },
  ];

  public alertInputImage2 = [
    {
      placeholder: 'Elige una foto para el Mercado de Pases',
      name: 'image2',
      type: 'file'
    },
  ];

  selectedFile2: File | null = null

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



  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notifyService: NotifyService, private AuthService: AuthService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private alertController: AlertController) {   
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      shirtNumber: ['', Validators.required]
    })
    this.form2 = this.fb.group({
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[1-9]\\.[0-9]{2}$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required],
      horarios: [[]],
    })
    this.form3 = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nacimiento: ['', Validators.required],
      position: ['', Validators.required],
      pieHabil: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('^[1-9]\\.[0-9]{2}$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      trayectoria: ['', Validators.required],
      zona: ['', Validators.required],
      horarios: [[]],
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
    //this.getPlayers()
    this.getUser()
    this.getMarket()
    this.getMyPlayer()
    this.getMyList()
    this.cargarJugadores({});
    this.getPlayersList()
    this.userService.getMyListUpdatedListener().subscribe(() => {
      this.getPlayersList()
      this.getMyList()
    })
    this.userService.getMyListEliminatedUpdate().subscribe(() => {
      this.getMyPlayer()
      this.getUser()
      this.getMyList()
      this.getPlayersList()
    })
  }

  getMyList(){
    this.userService.getMyListActive().subscribe({
      next: (res : any) => {
        this.list = res.list
      },
      error: (err) => {
        this.notifyService.error(err.error.message)
      }
    })
  }

  cargarJugadores(filtros: any) {
    this.userService.buscarJugadoresMarket(filtros).subscribe({
      next: (res: any) => {
        // Asignamos los jugadores de mercado
        this.playersMarket = res.jugadores || [];
        
        // Nos aseguramos de excluir `myPlayer` solo si está definido
        if (this.myPlayer?._id) {
          this.playersFiltered = this.playersMarket.filter(player => player._id !== this.myPlayer._id);
        } else {
          this.playersFiltered = this.playersMarket; // Si no tenemos myPlayer, mostramos todos los jugadores
        }
  
        console.log("Jugadores después de filtrar:", this.playersFiltered);
      },
      error: (err: any) => {
        console.error('Error al cargar jugadores:', err);
      }
    });
  }
  
  calcularEdad(fechaNacimiento : any) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy.getMonth() < nacimiento.getMonth() || 
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  aplicarFiltros() {
    this.userService.buscarJugadoresMarket(this.filtros).subscribe({
      next: (res: any) => {
        this.playersFiltered = res.jugadores;
        this.cargarJugadores(this.filtros); // Usar los filtros seleccionados
      },
      error: (err: any) => {
        console.error('Error al aplicar filtros:', err);
      }
    }
    );
  }

  desaplicarFiltros(){
    this.cargarJugadores({}); // Usar los filtros vacíos
    this.filtros = {}
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
        this.form2.patchValue({
          nombre: this.user.firstName || '',
          apellido: this.user.lastName || '',
          nacimiento: this.user.birthday || ''
        })
        console.log("sdasdio haspdfhasd;",this.form2.value)
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
        if (this.myPlayer) { // Solo ejecuta si myPlayer no es null
          this.form3.patchValue({
            nombre: this.myPlayer.nombre || '',
            apellido: this.myPlayer.apellido || '',
            nacimiento: this.myPlayer.nacimiento || '',
            position: this.myPlayer.position || '',
            pieHabil: this.myPlayer.pieHabil || '',
            altura: this.myPlayer.altura || '',
            peso: this.myPlayer.peso || '',
            trayectoria: this.myPlayer.trayectoria || '',
            zona: this.myPlayer.zona || '',
            horarios: this.myPlayer.horarios || ''
          })};
          console.log('Jugador actualizado:', this.form2.value);
          this.cargarJugadores({});
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  editMyPlayer(){
    const formulario = {
      nombre: this.form3.get('nombre')?.value,
      apellido: this.form3.get('apellido')?.value,
      nacimiento: this.form3.get('nacimiento')?.value,
      position: this.form3.get('position')?.value,
      pieHabil: this.form3.get('pieHabil')?.value,
      altura: this.form3.get('altura')?.value,
      peso: this.form3.get('peso')?.value,
      trayectoria: this.form3.get('trayectoria')?.value,
      zona: this.form3.get('zona')?.value,
      horarios: this.form3.get('horarios')?.value
    }
    this.userService.editMyPlayer(formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success('Jugador actualizado')
        this.getMyPlayer()
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
        //this.getPlayers()
      },
      error: (err: any) => {
        this.notifyService.error(err.message)
      }
    })
  }

  /*getPlayers() {
    this.userService.getPlayersTeam().subscribe({
      next: (res: any) => {
        this.players = res.listOfPlayers;
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message)
      }
    })
  }*/

  getPlayersList(){
    this.userService.getPlayersList().subscribe({
      next: (res: any) => {
        this.playersList = res.listOfPlayers;
        console.log("mis players",this.playersList)
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
        //this.getPlayers()
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

  onSelectImage() {
    const fileInput = document.getElementById('file-input-myPlayer') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo oculto
  }

  onSelectImage2() {
    const fileInput = document.getElementById('file-input-edit') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo oculto
  }

  ingresarMarket(){
    const formulario = {
      nombre: this.form2.get('nombre')?.value,
      apellido: this.form2.get('apellido')?.value,
      nacimiento: this.form2.get('nacimiento')?.value,
      horarios: this.form2.value.horarios,
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
    //window.location.href = '/user/players'
    this.isModalOpen = false;
  }

  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile2 = file;
    console.log('Archivo seleccionado:', file);

    if (file) {
      this.editImage();
    }
  }

  onFileSelected3(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile3 = file;
    console.log('Archivo seleccionado:', file);

    if (file) {
      this.editImage2();
    }
  }

  editImage(){
    const form = new FormData();
    form.append('image', this.selectedFile2 as Blob);
    console.log("Este es mi form: " ,form)
    this.AuthService.editPhotoProfile(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        window.location.href = 'user/players'
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  editImage2(){
    const form = new FormData();
    form.append('image', this.selectedFile3 as Blob);
    this.AuthService.editPhotoProfile(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getMyPlayer()
        //this.getPlayers()
        this.getUser()
          // Actualiza el BehaviorSubject con la nueva URL de la imagen
          this.AuthService.updateUser(res.user);
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  async presentAlertImagen() {
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
            this.editImage2(); // Llama a la función para editar la imagen
          }
        }
      ]
    });
  
    await alert.present();
  }

  deletePhoto(){
    const form = new FormData();
    form.append('image', this.selectedFile as Blob);
    this.AuthService.deletePhotoProfile(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        window.location.href = `/user/players`
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }

  deletePhoto2(){
    const form = new FormData();
    form.append('image', this.selectedFile3 as Blob);
    this.AuthService.deletePhotoProfile(form).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getMyPlayer()
        //this.getPlayers()
        this.getUser()
      },
      error: (err: any) => {
        this.notifyService.error(err.error.message);
      }
    })
  }



}
