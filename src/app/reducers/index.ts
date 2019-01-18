import { combineReducers } from 'redux';
import { placeReducer } from 'app/reducers/place';
import PlaceState = RootState.PlaceState;
import { Place } from "app/models/Place";
import { MarkerData } from '../models/MarkerData';
import { ApiUserResponse } from '../models/ApiUserResponse';
import { ApiError } from '../models/ApiError';

export namespace RootState {
  export interface PlaceState {
    places: Place[][];
    currentPaceTableId: number;
    columns: string[];
    markers: MarkerData[];
    colors: {
      [key: string]: 'string',
    }
  }
  export interface AuthState {
    user: ApiUserResponse | undefined;
    error: Error | ApiError | {} | undefined,
  }
}

export interface RootState {
  place: PlaceState;
}

export const rootReducer = combineReducers<RootState>({
  place: placeReducer as any
});
