import { createReducer, on } from '@ngrx/store';
import * as mapActions from '../actions/map.actions';

export interface MapState {
    latLng: any;
}

export const initialState: MapState = {
    latLng: {},
}

const _mapReducer = createReducer(initialState,
    on(mapActions.saveLatLng, (state, { latLng }) => ({ ...state, latLng: latLng })),
);

export function mapReducer(state, action) {
    return _mapReducer(state, action);
}