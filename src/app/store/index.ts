import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from 'app/reducers/index';
import { loggerMiddleware } from 'app/middleware/loggerMiddleware';
import thunkMiddleware from 'redux-thunk';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
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
