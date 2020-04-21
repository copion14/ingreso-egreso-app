import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const set_user = createAction('[Auth] SET_USER', props<{ user: User }>());
export const unset_user = createAction('[Auth] UNSET_USER');
