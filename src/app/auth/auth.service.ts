import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { appState } from '../app.reducers';
import * as fromUiActions from '../shared/ui.actions';
import * as fromAuthActions from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscriptionFirebase: Subscription = new Subscription();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private angularFireStore: AngularFirestore,
    private store: Store<appState>
  ) { }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.subscriptionFirebase = this.angularFireStore.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((userObj: any) => {
            const user = new User(userObj);
            this.store.dispatch(fromAuthActions.set_user({ user }));
          });
      } else {
        this.subscriptionFirebase.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(fromUiActions.activar_loading());

    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        }

        this.angularFireStore.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.store.dispatch(fromUiActions.desactivar_loaging());

            this.router.navigate(['/']);
          })

      })
      .catch(error => {
        this.store.dispatch(fromUiActions.desactivar_loaging());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

  login(email: string, password: string) {
    this.store.dispatch(fromUiActions.activar_loading());

    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(fromUiActions.desactivar_loaging());

        this.router.navigate(['/']);

      }).catch(error => {
        this.store.dispatch(fromUiActions.desactivar_loaging());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.angularFireAuth.auth.signOut()
      .then(resp => {

      }).catch(error => {

      });
  }
  isAuth() {
    return this.angularFireAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null
      })
    )
  }
}
