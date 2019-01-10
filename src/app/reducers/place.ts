import { handleActions } from 'redux-actions';
import {RootState} from "app/reducers/index";

const initialState: RootState.PlaceState = {

};

export const placeReducer = handleActions<RootState.PlaceState, void>(
  {

  },
  initialState
);
