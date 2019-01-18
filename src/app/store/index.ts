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
    save({ states: ['place.places', 'auth.user'], debounce: 500 }));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const cache = load({ states: ['place.places', 'auth.user']}) as Partial<RootState>;

  if (!initialState) {
    initialState = {
      place: placeInitialState,
      auth: authInitialState,
    };
  }

  if (cache && cache.place && cache.place.places) {
    initialState.place.places = cache.place.places;
  }

  if (cache && cache.auth && cache.auth.user) {
    initialState.auth.user = cache.auth.user;
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
