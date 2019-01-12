import configureMockStore from 'redux-mock-store'
import thunk, { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { PlaceActions } from './place';
import loadTable = PlaceActions.loadTable;
import { readFileSync } from "fs";
import mapTable = PlaceActions.mapTable;
import * as dataTable from '../mocks/data.table.json';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, ThunkAction<void, RootState, void, AnyAction>>(middlewares);


describe('Place actions', () => {
  it('Convert plain text to table', async () => {
    const store = mockStore();
    const dataCSV = readFileSync('src/app/mocks/data.csv', 'utf8');
    return store.dispatch<any>(loadTable(dataCSV)).then(() => {
      expect(store.getActions()).toEqual([
        mapTable(<any>dataTable)
      ]);
    });
  });
});
