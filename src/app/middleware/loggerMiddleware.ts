import { Middleware } from 'redux';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action, store.getState());
  }
  return next(action);
};
