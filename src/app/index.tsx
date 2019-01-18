import * as React from 'react';
import { Redirect, Route, RouteProps, RouterProps, Switch, withRouter } from 'react-router';
import { Main } from 'app/containers/Main';
import { hot } from 'react-hot-loader';
import { SignIn } from './containers/SignIn';
import { connect } from 'react-redux';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentClass<any, any>;
}
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }} />
  )} />
);

interface Props extends RouterProps {
  isAuthenticated?: boolean;
}

export const App = (hot(module)(withRouter(connect((state) => {
  return {
    isAuthenticated: !!state.auth.user,
  };
})((props: Props) => (
  <Switch>
    <Route path="/sign-in" component={SignIn} exact={true}/>
    <PrivateRoute path="/" component={Main} isAuthenticated={props.isAuthenticated || false}/>
  </Switch>
)))));
