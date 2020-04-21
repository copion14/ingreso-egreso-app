import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const set_items = createAction('[Ingreso egreso] SET_ITEMS', props<{ items: IngresoEgreso[] }>());
export const unset_items = createAction('[Ingreso egreso] UNSET_ITEMS');
