import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducers';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  nombre: string;
  subscription: Subscription = new Subscription();
  constructor(
    public AuthService: AuthService,
    private store: Store<appState>,
    private IngresoEgresoService:IngresoEgresoService
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

  logout() {
    this.AuthService.logout();
    this.IngresoEgresoService.cancelarSubscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
