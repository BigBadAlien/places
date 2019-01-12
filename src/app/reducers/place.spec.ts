import { placeReducer } from './place';
import { PlaceActions } from '../actions/place';
import * as dataState from '../mocks/data.state.json';
import * as dataTable from '../mocks/data.table.json';


describe('Place reducer', () => {
  it('Map table to Place models', async () => {
    expect(placeReducer({ places: [] }, PlaceActions.mapTable(<any>dataTable)))
      .toEqual({ places: dataState });
  });
});
