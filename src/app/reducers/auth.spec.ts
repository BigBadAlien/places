import { authReducer, initialState } from './auth';
import { AuthActions } from '../actions/auth';
import * as user from '../mocks/user.json';
import * as authError from '../mocks/auth-error.json';

describe('Auth reducer', () => {
  it('setCurrentUser', () => {
    expect(authReducer(initialState, AuthActions.setCurrentUser(user as any)))
      .toMatchObject({user});
  });

  it('setAuthError', () => {
    expect(authReducer(initialState, AuthActions.setAuthError(authError as any)))
      .toMatchObject({error: authError});
  });

  it('setAuthError', () => {
    expect(authReducer(Object.assign({}, initialState, {error: authError}), AuthActions.resetAuthError()))
      .toMatchObject({error: undefined});
  });
});
