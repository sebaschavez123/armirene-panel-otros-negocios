import { createAction, props } from '@ngrx/store';

export const saveLatLng = createAction('[Map Component] Save Map Lat Lng in the store',
    props<{ latLng }>());

export const saveWarningAddress = createAction('[Map Component] Save warning address in the store',
    props<{ warningAddress }>());