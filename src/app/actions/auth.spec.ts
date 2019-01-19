import configureMockStore from 'redux-mock-store'
import thunk, { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import * as user from '../mocks/user.json';
import * as authError from '../mocks/auth-error.json';
import { AuthActions } from './auth';
import signIn = AuthActions.signIn;

const userString = JSON.stringify(user);
const authErrorString = JSON.stringify(authError);

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, ThunkAction<void, RootState, void, AnyAction>>(middlewares);

describe('Auth actions', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('Success authentication', async () => {
    fetchMock
      .mockResponseOnce(userString);

    const store = mockStore();

    return store.dispatch<any>(signIn({email: 'foobar@mail.com', password: 'foobarpassword'})).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'AUTH_SET_CURRENT_USER',
          payload: user
        }]);
      expect(fetchMock.mock.calls.length).toEqual(1);
    })
  });

  it('Fail authentication', async () => {
    fetchMock
      .mockResponseOnce(authErrorString, {status: 401});

    const store = mockStore();

    return store.dispatch<any>(signIn({email: 'foobar@mail.com', password: 'foobarpassword'})).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'AUTH_SET_ERROR',
          payload: authError
        }]);store.getActions();
      expect(fetchMock.mock.calls.length).toEqual(1);
    })
  });
});
