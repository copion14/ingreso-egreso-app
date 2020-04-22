import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface appState {
  ui: fromUI.State,
  auth: fromAuth.AuthState,
  // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}


export const appReducers: ActionReducerMap<appState> = {
  ui: fromUI.uireducer,
  auth: fromAuth.authreducer,
  // ingresoEgreso: fromIngresoEgreso.ingresoEgresoreducer
}
