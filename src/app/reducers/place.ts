import { handleActions } from 'redux-actions';
import { Table } from '../models/Table';
import { PlaceActions } from '../actions/place';
import { RootState } from './index';

const initialState: RootState.PlaceState = {
  places: [],
};


export const placeReducer = handleActions<RootState.PlaceState, Table>(
  {
    [PlaceActions.Type.NORMALIZE_TABLE]: (state, action) => {
      return Object.assign({}, {
        places: action.payload!.map((row, index) => ({
          address: row[0],
          city: row[1],
          state: row[2],
          zipcode: row[3],
          category: row[4],
          id: index,
        }))
      });
    },
  },
  initialState
);
