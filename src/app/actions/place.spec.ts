import configureMockStore from 'redux-mock-store'
import thunk, { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { PlaceActions } from './place';
import { readFileSync } from 'fs';
import setTable = PlaceActions.setTable;
import * as dataTable from '../mocks/data.table.json';
import * as geocodeSearch from '../mocks/geocode-search.json';
import * as orderedTable from '../mocks/ordered.table.json';
import { initialState } from '../reducers/place';
import { ADDRESS_COLUMN_INDEX, CATEGORY_COLUMN_INDEX } from '../models/Place';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, ThunkAction<void, RootState, void, AnyAction>>(middlewares);

PlaceActions.GMapApiFetchPositionByAddress = jest.fn().mockResolvedValue((geocodeSearch as any).results[0].geometry.location);

describe('Place actions', () => {
  it('loadTable', () => {
    const store = mockStore();
    const dataCSV = readFileSync('src/app/mocks/data.csv', 'utf8');
    return store.dispatch<any>(PlaceActions.loadTable(dataCSV)).then(() => {
      expect(store.getActions()).toEqual([
        setTable(<any>dataTable)
      ]);
    });
  });

  it('showMarkers', () => {
    const store = mockStore({
      place: Object.assign({}, initialState, {
        places: [orderedTable],
        colors: {
          [(orderedTable as any)[0][CATEGORY_COLUMN_INDEX] as string]: 'ffffff',
          [(orderedTable as any)[1][CATEGORY_COLUMN_INDEX] as string]: '000000',
        }
      }),
    });

    return store.dispatch<any>(PlaceActions.showMarkers()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({type: 'RESET_MARKERS'});
      expect(actions[1]).toEqual({type: 'GENERATE_COLORS'});
      expect(actions).toContainEqual({
        type: 'SET_MARKER',
        payload:
          {
            title: `${(orderedTable as any)[0][ADDRESS_COLUMN_INDEX]}, ${(orderedTable as any)[0][CATEGORY_COLUMN_INDEX]}`,
            position: (geocodeSearch as any).results[0].geometry.location,
            color: 'ffffff'
          }
      });

      expect(actions).toContainEqual({
        type: 'SET_MARKER',
        payload:
          {
            title: `${(orderedTable as any)[1][ADDRESS_COLUMN_INDEX]}, ${(orderedTable as any)[1][CATEGORY_COLUMN_INDEX]}`,
            position: (geocodeSearch as any).results[0].geometry.location,
            color: '000000'
          }
      });

      expect(actions).toContainEqual({
        type: 'SET_MARKER',
        payload:
          {
            title: `${(orderedTable as any)[2][ADDRESS_COLUMN_INDEX]}, ${(orderedTable as any)[2][CATEGORY_COLUMN_INDEX]}`,
            position: (geocodeSearch as any).results[0].geometry.location,
            color: 'ffffff'
          }
      });
    });
  });
});
