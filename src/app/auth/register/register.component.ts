import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cargando: boolean;
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
  onSubmit(data: any) {
    this.AuthService.crearUsuario(data.nombre, data.email, data.password);
  }

}
