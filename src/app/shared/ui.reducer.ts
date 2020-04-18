import { createReducer, on } from '@ngrx/store';
import * as fromUI from './ui.actions';

export interface State {
  isloading: boolean;
}

const initialState: State = {
  isloading: false
}

const _uiReducer = createReducer(initialState,

  on(fromUI.activar_loading, state => {
    return { isloading: true };
  }),

  on(fromUI.desactivar_loaging, state => {
    return { isloading: false };
  }),

);

export function uireducer(state, action) {
  return _uiReducer(state, action);
}
