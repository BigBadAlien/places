import { combineReducers } from 'redux';
import { placeReducer } from 'app/reducers/place';
import PlaceState = RootState.PlaceState;

export namespace RootState {
  export interface PlaceState {
  }
}

export interface RootState {
  place: PlaceState;
}

export const rootReducer = combineReducers<RootState>({
  place: placeReducer as any
});
