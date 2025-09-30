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
     this.torunamentServ.sanciones$.subscribe((sanciones) => {
      this.tribunales = sanciones;

      // regenerar forms cuando cambian
      this.forms = {};
      this.tribunales.forEach(t => {
        this.forms[t._id] = this.fb.group({
          _id: [t._id],
          fechas_de_expulsion: [t.fechas_de_expulsion || '']
        });
      });
    });
    this.getTribunales()
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

    getTribunalesPorTipo(isTorneo: boolean): Tribunales[] {
    return this.tribunales.filter(t => t.isTorneo === isTorneo);
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

  hayCambios(): boolean {
  return this.tribunales.some(t => this.forms[t._id]?.dirty);
}

guardarTodas() {
  // Enviamos solo las que cambiaron (dirty) para evitar escrituras innecesarias
  const sanciones = this.tribunales
    .filter(t => this.forms[t._id]?.dirty)
    .map(t => {
      const raw = this.forms[t._id].value;
      return {
        _id: raw._id,
        fechas_de_expulsion: Number(raw.fechas_de_expulsion) || 0
      };
    });

  if (sanciones.length === 0) {
    this.notifyService.info('No hay cambios para guardar.');
    return;
  }

  this.torunamentServ.editFechas({ sanciones }).subscribe({
    next: (res: any) => {
      this.notifyService.success(res.message || 'Actualización masiva exitosa');
      this.getTribunales(); // refresca y resetea estado dirty
    },
    error: (err: any) => {
      console.error(err);
      this.notifyService.error(err.error?.message || 'Error al editar sanciones');
    }
  });
}


  volver() {
    this.router.navigate([`/admin/tournaments/${this.id}`])
  }

}
