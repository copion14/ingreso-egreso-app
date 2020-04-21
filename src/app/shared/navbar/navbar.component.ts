import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nombre: string;
  subscription: Subscription = new Subscription();
  constructor(
    private store:Store<appState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(auth => {
        return auth.user != null
      })
    )
    .subscribe(auth => {
      this.nombre = auth.user.nombre
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
