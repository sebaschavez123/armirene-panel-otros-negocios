import { createReducer, on } from '@ngrx/store';
import * as mapActions from '../actions/map.actions';

export interface MapState {
    latLng: any;
    warningAddress: boolean;
}

export const initialState: MapState = {
    latLng: {},
    warningAddress: false
}

const _mapReducer = createReducer(initialState,
    on(mapActions.saveLatLng, (state, { latLng }) => ({ ...state, latLng: latLng })),
    on(mapActions.saveWarningAddress, (state, { warningAddress }) => ({ ...state, warningAddress: warningAddress })),
);



export function mapReducer(state, action) {
    return _mapReducer(state, action);
}