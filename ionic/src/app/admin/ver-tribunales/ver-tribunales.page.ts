import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tribunales } from 'src/app/interfaces/Tribunales';
import { NotifyService } from 'src/app/services/notify.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-tribunales',
  templateUrl: './ver-tribunales.page.html',
  styleUrls: ['./ver-tribunales.page.scss'],
})
export class VerTribunalesPage implements OnInit {

  id: any;
  tribunales: Tribunales[] = [];
  list: any;
  forms: { [key: string]: FormGroup } = {}; 

  constructor(private route: ActivatedRoute, private torunamentServ: TournamentService, private notifyService: NotifyService, private userService: UserService, private router: Router, private fb: FormBuilder) { 
   
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTribunales();
  }

  getTribunales() {
    this.torunamentServ.getTribunales(this.id).subscribe({
      next: (res: any) => {
        this.tribunales = res.sanciones;
        this.tribunales.forEach(t => {
          this.forms[t._id] = this.fb.group({
            _id: [t._id],
            fechas_de_expulsion: [t.fechas_de_expulsion || '']
          });
        });
      },
      error: (err: any) => {
        console.error(err);
        this.notifyService.error(err.error.message || 'Error al obtener los tribunales');
      }
    });
  }

  

  getList(id:any){
    this.userService.getList(id).subscribe({
      next: (res:any) => {
        this.list = res.list;
        console.log("Lista obtenida:", this.list);
      },
      error: (err:any) => {
        console.error(err);
        this.notifyService.error(err.error.message || 'Error al obtener la lista');
      }
    })
  }

 editarFechas(id: string) {
    const form = this.forms[id];
    const formulario = {
      _id: form.value._id,
      fechas_de_expulsion: form.value.fechas_de_expulsion
    };

    this.torunamentServ.editFechas(formulario).subscribe({
      next: (res: any) => {
        this.notifyService.success(res.message);
        this.getTribunales(); // para refrescar
      },
      error: (err: any) => {
        console.error(err);
        this.notifyService.error(err.error.message || 'Error al editar las fechas de expulsión');
      }
    });
  }

  volver() {
    this.router.navigate([`/admin/tournaments/${this.id}`])
  }

}
