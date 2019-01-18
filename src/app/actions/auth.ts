import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { ApiSignInPayload } from '../models/ApiSignInPayload';
import { createAction } from 'redux-actions';
import { ApiUserResponse } from '../models/ApiUserResponse';
import { environment } from '../../environment';
import { ApiError } from '../models/ApiError';


export namespace AuthActions {
  export enum Type {
    AUTH_SET_CURRENT_USER = 'AUTH_SET_CURRENT_USER',
    AUTH_SET_ERROR = 'AUTH_SET_ERROR',
    AUTH_RESET_ERROR = 'AUTH_RESET_ERROR',
  }

  export const signIn = function (
    payload: ApiSignInPayload
  ): ThunkAction<void, RootState, void, AnyAction> {
    return (dispatch) => {
      return ApiPostAuth(payload)
        .then((user) => {
          dispatch(setCurrentUser(user));
        })
        .catch((error: Error | ApiError) => {
          dispatch(setAuthError(error));
        });
    };
  };

  const ApiPostAuth = (payload: ApiSignInPayload): Promise<ApiUserResponse> => {
    return fetch(environment.api.auth, {
      method: 'POST',
      body: `email=${payload.email}&password=${payload.password}`,
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    }).then((response) => {
      return response.json()
        .then((responseData) => {
          if (response.status === 200) {
            return responseData;
          }

          throw responseData;
        });
    });
  };

  export const setCurrentUser = createAction<ApiUserResponse>(Type.AUTH_SET_CURRENT_USER);
  export const setAuthError = createAction<Error | ApiError>(Type.AUTH_SET_ERROR);
  export const resetAuthError = createAction<void>(Type.AUTH_RESET_ERROR);
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>;
