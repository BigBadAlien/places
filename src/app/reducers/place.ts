import { handleActions } from 'redux-actions';
import { Table } from '../models/Table';
import { PlaceActions } from '../actions/place';
import { RootState } from './index';

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


export const placeReducer = handleActions<RootState.PlaceState, Table>(
  {
    [PlaceActions.Type.SET_TABLE]: (state, action) => {
      return Object.assign({}, state, {
        places: action.payload!
      });
    },
  },
  initialState
);
