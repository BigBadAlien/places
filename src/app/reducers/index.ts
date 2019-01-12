import { combineReducers } from 'redux';
import { placeReducer } from 'app/reducers/place';
import PlaceState = RootState.PlaceState;
import { Place } from "app/models/Place";

export namespace RootState {
  export interface PlaceState {
    places: Place[];
  }
}

export interface RootState {
  place: PlaceState;
}

export const rootReducer = combineReducers<RootState>({
  place: placeReducer as any
});
