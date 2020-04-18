import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface appState {
  ui: fromUI.State,
  auth:fromAuth.AuthState
}


export const appReducers: ActionReducerMap<appState> = {
  ui: fromUI.uireducer,
  auth:fromAuth.authreducer
}
