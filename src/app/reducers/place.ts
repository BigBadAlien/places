import { Action, handleActions } from 'redux-actions';
import { PlaceActions } from '../actions/place';
import { RootState } from './index';
import { MoveColumnParams } from '../models/MoveColumnParams';

const initialState: RootState.PlaceState = {
  places: [],
  columns: [
    'Address',
    'City',
    'State',
    'Zip Code',
    'Category',
  ]
};


export const placeReducer = handleActions<RootState.PlaceState, any>(
  {
    [PlaceActions.Type.SET_TABLE]: (state, action) => {
      return Object.assign({}, state, {
        places: action.payload!
      });
    },
    [PlaceActions.Type.MOVE_COLUMN]: (state, action: Action<MoveColumnParams>) => {
      return Object.assign({}, state, {
        places: state.places.map((place) => {
          if (action.type === PlaceActions.Type.MOVE_COLUMN) {
            const element = place[action.payload!.from];
            place.splice(action.payload!.from, 1);
            place.splice(action.payload!.to, 0, element);
          }

          return place;
        })
      });
    },
  },
  initialState
);
