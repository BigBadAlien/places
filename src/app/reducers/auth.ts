import { Action, handleActions } from 'redux-actions';
import { RootState } from './index';
import { AuthActions } from '../actions/auth';
import { ApiUserResponse } from '../models/ApiUserResponse';
import { ApiError } from '../models/ApiError';

export const initialState: RootState.AuthState = {
  user: undefined,
  error: undefined,
};


export const authReducer = handleActions<RootState.AuthState, any>(
  {
    [AuthActions.Type.AUTH_SET_CURRENT_USER]: (state, action: Action<ApiUserResponse>) => {
      return Object.assign({}, state, {
        user: action.payload,
      })
    },
    [AuthActions.Type.AUTH_SET_ERROR]: (state, action: Action<Error | ApiError>) => {
      return Object.assign({}, state, {
        error: action.payload,
      })
    },
    [AuthActions.Type.AUTH_RESET_ERROR]: (state) => {
      return Object.assign({}, state, {
        error: undefined,
      })
    },
  },
  initialState
);
