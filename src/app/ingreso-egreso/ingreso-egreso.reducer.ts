import { createReducer, on } from '@ngrx/store';
import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { appState } from '../app.reducers';


export interface IngresoEgresoState {
  items: IngresoEgreso[]
}

export interface AppStateExtension extends appState{
  ingresoEgreso: IngresoEgresoState
}


const initialState: IngresoEgresoState = {
  items: []
}


const _ingresoEgredoReducer = createReducer(initialState,

  on(fromIngresoEgreso.set_items, (state, { items }) => {
    return { items: [...items.map(item => { return { ...item } })] };
  }),

  on(fromIngresoEgreso.unset_items, (state) => {
    return {
      items: []
    };
  }),

);

export function ingresoEgresoreducer(state, action) {
  return _ingresoEgredoReducer(state, action);
}
