import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2'
import { AppStateExtension } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  items: IngresoEgreso[]
  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<AppStateExtension>,
    private IngresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.items = ingresoEgreso.items;
    })
  }
  borrarItem(uid: string) {
    this.IngresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Borrado',
          text: 'item borrado exitosamente',
        })
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }


}
