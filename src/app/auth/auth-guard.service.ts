import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    public AuthService: AuthService) { }

  canActivate() {
    return this.AuthService.isAuth();
  }
  canLoad() {
    return this.AuthService.isAuth()
                .pipe(
                  take(1)
                );

  }


}
