import { createAction } from "redux-actions";
import { Table } from "app/models/Table";

export namespace PlaceActions {
  export enum Type {
    LOAD_TABLE = 'LOAD_TABLE',
  }

  export const loadTable = createAction<Table>(Type.LOAD_TABLE);
}

export type PlaceActions = Omit<typeof PlaceActions, 'Type'>;
