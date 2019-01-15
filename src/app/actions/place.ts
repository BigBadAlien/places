import { createAction } from "redux-actions";
import { Table } from "app/models/Table";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import * as csv from 'csvtojson';
import { MoveColumnData } from '../models/MoveColumnData';

export namespace PlaceActions {
  export enum Type {
    SET_TABLE = 'SET_TABLE',
    MOVE_COLUMN = 'MOVE_COLUMN',
  }

  export const loadTable = function(
    payload: string
  ): ThunkAction<void, RootState, void, AnyAction> {
    return async (dispatch) => {
      const table = await csv({
        noheader: true,
        output: 'csv'
      }).fromString(payload);

      dispatch(setTable(table));
    };
  };

  export const setTable = createAction<Table>(Type.SET_TABLE);
  export const moveColumn = createAction<MoveColumnData>(Type.MOVE_COLUMN);
}

export type PlaceActions = Omit<typeof PlaceActions, 'Type'>;
