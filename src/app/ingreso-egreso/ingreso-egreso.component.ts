import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromUi from '../shared/ui.actions'
import { AppStateExtension } from './ingreso-egreso.reducer';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit {

  forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSubs: Subscription = new Subscription();

  constructor(public IngresoEgresoService: IngresoEgresoService
    , private store: Store<AppStateExtension>) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      'descripcion': new FormControl('', [Validators.required]),
      'monto': new FormControl(0, [Validators.min(0)])
    })
    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isloading
    })

  }
  crearIngreso() {
    this.store.dispatch(fromUi.activar_loading());
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.IngresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(resp => {
        this.forma.reset({ monto: 0 })
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'ha sido creado exitosamente',
        })
        this.store.dispatch(fromUi.desactivar_loaging());

      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
        this.store.dispatch(fromUi.desactivar_loaging());

      });


    // console.log(this.forma.value);
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
