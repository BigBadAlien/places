import { placeReducer } from './place';
import { PlaceActions } from '../actions/place';
import * as dataTable from '../mocks/data.table.json';


describe('Place reducer', () => {
  it('Set data in store', async () => {
    expect(placeReducer({places: [], columns: []}, PlaceActions.setTable(<any>dataTable)))
      .toEqual({places: dataTable, columns: []});
  });

  it('Move column', async () => {
    expect(placeReducer({
      places: [
        ['11', '12', '13', '14', '15'],
        ['21', '22', '23', '24', '25'],
        ['31', '32', '33', '34', '35']],
      columns: []
    }, PlaceActions.moveColumn(<any>{
      from: 3,
      to: 0,
    })))
      .toEqual({
        places: [
          ['14', '11', '12', '13', '15'],
          ['24', '21', '22', '23', '25'],
          ['34', '31', '32', '33', '35']],
        columns: []
      });

    expect(placeReducer({
      places: [
        ['11', '12', '13', '14', '15'],
        ['21', '22', '23', '24', '25'],
        ['31', '32', '33', '34', '35']],
      columns: []
    }, PlaceActions.moveColumn(<any>{
      from: 0,
      to: 4,
    })))
      .toEqual({
        places: [
          ['12', '13', '14', '15', '11'],
          ['22', '23', '24', '25', '21'],
          ['32', '33', '34', '35', '31']],
        columns: []
      });

    expect(placeReducer({
      places: [
        ['11', '12', '13', '14', '15'],
        ['21', '22', '23', '24', '25'],
        ['31', '32', '33', '34', '35']],
      columns: []
    }, PlaceActions.moveColumn(<any>{
      from: 4,
      to: 4,
    })))
      .toEqual({
        places: [
          ['11', '12', '13', '14', '15'],
          ['21', '22', '23', '24', '25'],
          ['31', '32', '33', '34', '35']],
        columns: []
      });
  });
});
