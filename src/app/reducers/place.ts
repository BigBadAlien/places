import { Action, handleActions } from 'redux-actions';
import { RootState } from './index';
import { MoveColumnPayload } from '../models/MoveColumnPayload';
import { MarkerData } from '../models/MarkerData';
import { PlaceActions } from '../actions/place';
import { getRandomColor } from '../utils/getRandomColor';
import { CATEGORY_COLUMN_INDEX } from '../models/Place';
import { SetCurrentTablePayload } from '../models/Table';

export const initialState: RootState.PlaceState = {
  places: [],
  currentPaceTableId: undefined,
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
      const HISTORY_LENGTH = 3;

      return Object.assign({}, state, {
        places: [action.payload!, ...state.places.splice(0,HISTORY_LENGTH - 1)],
        currentPaceTableId: 0,
        markers: [],
      });
    },
    [PlaceActions.Type.MOVE_COLUMN]: (state, action: Action<MoveColumnPayload>) => {
      const places = state.places;
      places[state.currentPaceTableId || 0] = places[state.currentPaceTableId || 0].map((place) => {
        if (action.type === PlaceActions.Type.MOVE_COLUMN) {
          const element = place[action.payload!.from];
          place.splice(action.payload!.from, 1);
          place.splice(action.payload!.to, 0, element);
        }

        return place;
      });

      return Object.assign({}, state, {
        places: places
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
        colors: Array.from(new Set(state.places[state.currentPaceTableId || 0].map((place) => place[CATEGORY_COLUMN_INDEX])))
          .reduce((acc, category) => {
            return {
              ...acc,
              [category]: getRandomColor(),
            };
          }, {})
      });
    },
    [PlaceActions.Type.SET_CURRENT_TABLE]: (state, action: Action<SetCurrentTablePayload>) => {
      return Object.assign({}, state, {
        currentPaceTableId: action.payload!.tableId,
        markers: [],
      });
    },
  },
  initialState
);
