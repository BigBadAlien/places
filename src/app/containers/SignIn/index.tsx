import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { Redirect, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import { AuthActions } from '../../actions/auth';
import { SignInForm } from '../../components/SignInForm';
import * as style from './style.css';
import { ApiError } from '../../models/ApiError';
import { Alert } from 'antd';

export interface Props extends RouteComponentProps<void> {
  actions: AuthActions;
  isAuthenticated: boolean;
  errorMessage: string | undefined;
}


@connect(
  (state: RootState): Partial<Props> => {
    return {
      isAuthenticated: !!state.auth.user,
      errorMessage: ((e) => {
        if (!e) {
          return undefined;
        }

        if (e && (e as ApiError).error && (e as ApiError).error.message) {
          return (e as ApiError).error.message;
        }

        if (e && (e as Error).message) {
          return (e as Error).message;
        }

        return 'Unexpected error. Please, try again later.';
      })(state.auth.error)
    };
  },
  (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    actions: bindActionCreators(omit(AuthActions, 'Type'), dispatch)
  })
)
export class SignIn extends React.Component<Props> {
  render() {
    return <div className={style.container}>
      <div className={style.content}>
        {this.props.isAuthenticated && <Redirect to={{pathname: '/',}}/>}
        {this.props.errorMessage && <Alert message={this.props.errorMessage} type="error"/>}
        <SignInForm onSubmit={(payload) => this.props.actions.signIn(payload)}/>
      </div>
    </div>;
  }
}
