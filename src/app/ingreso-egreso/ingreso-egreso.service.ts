import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { appState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';

import * as fromIngresoEgreso from './ingreso-egreso.actions'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();


  constructor(
    private AngularFirestore: AngularFirestore,
    public AuthService: AuthService,
    private store: Store<appState>

  ) { }

  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid)
      })

  }

  private ingresoEgresoItems(uid: string) {

    this.ingresoEgresoItemsSubscription = this.AngularFirestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as {}
            };
          })
        })
      )
      .subscribe((coleccion: any[]) => {

        this.store.dispatch(fromIngresoEgreso.set_items({ items: coleccion }))
      })
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const user = this.AuthService.getUser();

    return this.AngularFirestore.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso })

  }
  borrarIngresoEgreso(uid: string) {
    const user = this.AuthService.getUser();
    return this.AngularFirestore
      .doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();


  }
  cancelarSubscription() {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.store.dispatch(fromIngresoEgreso.unset_items());
  }
}
