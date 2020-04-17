import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private angularFireStore: AngularFirestore
  ) { }

  initAuthListener() {


    this.angularFireAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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
            this.router.navigate(['/']);
          })

      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

  login(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(['/']);

      }).catch(error => {
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
