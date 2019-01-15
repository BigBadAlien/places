import { placeReducer } from './place';
import { PlaceActions } from '../actions/place';
import * as dataTable from '../mocks/data.table.json';


describe('Place reducer', () => {
  it('Set data in store', async () => {
    expect(placeReducer({ places: [], columns: [] }, PlaceActions.setTable(<any>dataTable)))
      .toEqual({ places: dataTable, columns: [] });
  });
});
