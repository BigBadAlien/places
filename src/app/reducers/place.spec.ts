import { initialState, placeReducer } from './place';
import { PlaceActions } from '../actions/place';
import * as dataTable from '../mocks/data.table.json';
import { MarkerData } from '../models/MarkerData';
import * as orderedTable from '../mocks/ordered.table.json';
import { CATEGORY_COLUMN_INDEX } from '../models/Place';


describe('Place reducer', () => {
  it('setTable', () => {
    expect(placeReducer(initialState, PlaceActions.setTable(<any>dataTable)))
      .toMatchObject({places: dataTable});
  });

  it('moveColumn', () => {
    expect(placeReducer(Object.assign({}, initialState, {
        places: [
          ['11', '12', '13', '14', '15'],
          ['21', '22', '23', '24', '25'],
          ['31', '32', '33', '34', '35']]
      }),
      PlaceActions.moveColumn(<any>{
        from: 3,
        to: 0,
      })))
      .toMatchObject({
        places: [
          ['14', '11', '12', '13', '15'],
          ['24', '21', '22', '23', '25'],
          ['34', '31', '32', '33', '35']],
      });

    expect(placeReducer(Object.assign({}, initialState, {
        places: [
          ['11', '12', '13', '14', '15'],
          ['21', '22', '23', '24', '25'],
          ['31', '32', '33', '34', '35']]
      }),
      PlaceActions.moveColumn(<any>{
        from: 0,
        to: 4,
      })))
      .toMatchObject({
        places: [
          ['12', '13', '14', '15', '11'],
          ['22', '23', '24', '25', '21'],
          ['32', '33', '34', '35', '31']],
      });

    expect(placeReducer(Object.assign({}, initialState, {
        places: [
          ['11', '12', '13', '14', '15'],
          ['21', '22', '23', '24', '25'],
          ['31', '32', '33', '34', '35']]
      }),
      PlaceActions.moveColumn(<any>{
        from: 4,
        to: 4,
      })))
      .toMatchObject({
        places: [
          ['11', '12', '13', '14', '15'],
          ['21', '22', '23', '24', '25'],
          ['31', '32', '33', '34', '35']],
      });
  });

  it('resetMarkers', () => {
    expect(placeReducer(Object.assign({}, initialState, {
      markers: [
        {},
      ]
    }), PlaceActions.resetMarkers(<any>dataTable)))
      .toMatchObject({markers: []});
  });

  it('setMarker', () => {
    const marker: MarkerData = {
      title: 'Foo',
      position: {
        lat: 0,
        lng: 0,
      },
      color: 'ffffff',
    };

    expect(placeReducer(initialState, PlaceActions.setMarker(marker)))
      .toMatchObject({markers: [marker]});
  });

  it('generateColors', () => {
    const HEX_PATTERN = /^([A-Fa-f0-9]{6})$/;

    const colors = placeReducer(Object.assign({}, initialState, {
      places: orderedTable,
    }), PlaceActions.generateColors()).colors;

    expect(colors[(orderedTable as any)[0][CATEGORY_COLUMN_INDEX]]).toMatch(HEX_PATTERN);
    expect(colors[(orderedTable as any)[1][CATEGORY_COLUMN_INDEX]]).toMatch(HEX_PATTERN);
  });
});
