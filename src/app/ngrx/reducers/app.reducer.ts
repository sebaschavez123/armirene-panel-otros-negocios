import { ActionReducerMap } from '@ngrx/store';
import { MapState, mapReducer } from './map.reducer';

export interface AppState {
    map: MapState,
}

export const appReducers: ActionReducerMap<AppState> = {
    map: mapReducer,
}