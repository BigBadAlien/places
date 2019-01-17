import { createAction } from "redux-actions";
import { Table } from "app/models/Table";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import * as csv from 'csvtojson';
import { MoveColumnPayload } from '../models/MoveColumnPayload';
import { CancelablePromise, createCancelablePromise } from '../utils/createCancelablePromise';
import { MarkerData } from '../models/MarkerData';
import {
  ADDRESS_COLUMN_INDEX,
  CATEGORY_COLUMN_INDEX,
  CITY_COLUMN_INDEX,
  Place,
  STATE_COLUMN_INDEX, ZIP_CODE_COLUMN_INDEX
} from '../models/Place';


export namespace PlaceActions {
  export enum Type {
    SET_TABLE = 'SET_TABLE',
    MOVE_COLUMN = 'MOVE_COLUMN',
    RESET_MARKERS = 'RESET_MARKERS',
    SET_MARKER = 'SET_MARKER',
    SET_MARKER_ERROR = 'FETCH_MARKER_ERROR',
    GENERATE_COLORS = 'GENERATE_COLORS',
  }

  export const loadTable = function (
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

  export const showMarkers = function (): ThunkAction<void, RootState, void, AnyAction> {
    return function (dispatch, getState) {
      dispatch(resetMarkers());
      dispatch(generateColors());
      const state = getState();

      const queue = fetchPositions(state.place.places);

        queue.forEach((fetchPositionRequest) => {
          fetchPositionRequest.then((result) => dispatch(setMarker({
            title: `${result.place[ADDRESS_COLUMN_INDEX]}, ${result.place[CATEGORY_COLUMN_INDEX]}`,
            position: result.position,
            color: state.place.colors[result.place[CATEGORY_COLUMN_INDEX]],
          })))
            .catch((error) => dispatch(setMarkerError(error)));
        });

        return Promise.all(queue);
    };
  };

  export let GMapApiFetchPositionByAddress = (address: string) => {
    const geocoder = new google.maps.Geocoder();

    return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
      geocoder.geocode({address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results[0].geometry.location.toJSON());
        } else {
          reject({address, results, status});
        }
      });
    });
  };

  export const fetchPositions = (() => {
    let queue: CancelablePromise<{ place: Place; position: google.maps.LatLngLiteral }>[] = [];

    return (places: Place[]) => {
      queue.forEach((item) => item.cancel());
      queue = places.map((place) => createCancelablePromise(
        GMapApiFetchPositionByAddress(`${place[STATE_COLUMN_INDEX]},${place[CITY_COLUMN_INDEX]},${place[ADDRESS_COLUMN_INDEX]},${ZIP_CODE_COLUMN_INDEX}`)
          .then((position) => ({
            place,
            position
          }))
      ));
      return queue.map((item) => item.promise);
    };
  })();

  export const setTable = createAction<Table>(Type.SET_TABLE);
  export const moveColumn = createAction<MoveColumnPayload>(Type.MOVE_COLUMN);
  export const resetMarkers = createAction(Type.RESET_MARKERS);
  export const setMarker = createAction<MarkerData>(Type.SET_MARKER);
  export const setMarkerError = createAction<{ address: string }>(Type.SET_MARKER_ERROR);
  export const generateColors = createAction(Type.GENERATE_COLORS);
}

export type PlaceActions = Omit<typeof PlaceActions, 'Type'>;
