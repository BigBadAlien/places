import { createAction } from "redux-actions";
import { Table } from "app/models/Table";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import * as csv from 'csvtojson';

export namespace PlaceActions {
  export enum Type {
    NORMALIZE_TABLE = 'NORMALIZE_TABLE'
  }

  export const loadTable = function(
    payload: string
  ): ThunkAction<void, RootState, void, AnyAction> {
    return async (dispatch) => {
      const table = await csv({
        noheader: true,
        output: 'csv'
      }).fromString(payload);

      dispatch(mapTable(table));
    };
  };

  export const mapTable = createAction<Table>(Type.NORMALIZE_TABLE);
}

export type PlaceActions = Omit<typeof PlaceActions, 'Type'>;
