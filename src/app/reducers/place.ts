import { Action, handleActions } from 'redux-actions';
import { RootState } from './index';
import { MoveColumnPayload } from '../models/MoveColumnPayload';
import { MarkerData } from '../models/MarkerData';
import { PlaceActions } from '../actions/place';
import { getRandomColor } from '../utils/getRandomColor';
import { CATEGORY_COLUMN_INDEX } from '../models/Place';

export const initialState: RootState.PlaceState = {
  places: [],
  columns: [
    'Address',
    'City',
    'State',
    'Zip Code',
    'Category',
  ],
  markers: [],
  colors: {},
};


export const placeReducer = handleActions<RootState.PlaceState, any>(
  {
    [PlaceActions.Type.SET_TABLE]: (state, action) => {
      return Object.assign({}, state, {
        places: action.payload!
      });
    },
    [PlaceActions.Type.MOVE_COLUMN]: (state, action: Action<MoveColumnPayload>) => {
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
    [PlaceActions.Type.RESET_MARKERS]: (state) => {
      return Object.assign({}, state, {markers: []});
    },
    [PlaceActions.Type.SET_MARKER]: (state, action: Action<MarkerData>) => {
      return Object.assign({}, state, {
        markers: [...state.markers, action.payload!]
      });
    },
    [PlaceActions.Type.GENERATE_COLORS]: (state) => {
      return Object.assign({}, state, {
        colors: Array.from(new Set(state.places.map((place) => place[CATEGORY_COLUMN_INDEX])))
          .reduce((acc, category) => {
            return {
              ...acc,
              [category]: getRandomColor(),
            };
          }, {})
      });
    },
  },
  initialState
);
