import { createAction, props } from '@ngrx/store';

export const saveLatLng = createAction('[Map Component] Save Map Lat Lng in the store',
    props<{ latLng }>());