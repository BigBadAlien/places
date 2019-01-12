import * as csv from 'csvtojson';
import { placeReducer } from './place';
import { PlaceActions } from '../actions/place';
import { Table } from '../models/Table';
import * as tableJSON from './north.json';


describe('Route actions', () => {
  let table: Table;

  beforeAll(async () => {
    table = await csv({
      noheader: true,
      output: "csv"
    })
      .fromFile(__dirname + '/north.csv')
      .then((data: Table) => data);
  });

  it('Convert plain table to Place models', async () => {
    expect(placeReducer({ places: [] }, PlaceActions.loadTable(table)))
      .toEqual({ places: tableJSON });
  });
});
