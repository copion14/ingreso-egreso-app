import { createReducer, on } from '@ngrx/store';
import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  // autenticado:boolean
  user: User
}

const initialState: AuthState = {
  user: null
}

const _authreducer = createReducer(initialState,

  on(fromAuth.set_user, (state, { user }) => {

    return {
      //con los tre puntos rompo la referencia de los objetos copio el nuevo objeto a user
      user: { ...user }

    };
  }),

  on(fromAuth.unset_user, (state) => {
    return { user: null }
  }),



);

export function authreducer(state, action) {
  return _authreducer(state, action);
}
