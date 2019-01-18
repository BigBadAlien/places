import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from '../reducers';
import { loggerMiddleware } from 'app/middleware/loggerMiddleware';
import thunkMiddleware from 'redux-thunk';
import { load, save } from "redux-localstorage-simple"
import { initialState as placeInitialState } from '../reducers/place';
import { initialState as authInitialState } from '../reducers/auth';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    save({ states: ['place.places'], debounce: 500 }));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const cache = load({ states: ['place.places']}) as Partial<RootState>;

  if (cache && cache.place && cache.place.places) {
    if (!initialState) {
      initialState = {
        place: placeInitialState,
        auth: authInitialState,
      };
    }
    initialState.place.places = cache.place.places;
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
