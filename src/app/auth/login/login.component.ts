import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { appState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cargando: boolean
  subscription: Subscription;

  constructor(
    public AuthService: AuthService,
    private store: Store<appState>
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isloading;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  login(data: any) {
    this.AuthService.login(data.email, data.password);
  }

}
