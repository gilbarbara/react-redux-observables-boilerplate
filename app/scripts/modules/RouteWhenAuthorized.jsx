import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteWhenAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ?
      (<Component {...props} />) :
      (<Redirect
        to={{
          pathname: '/login',
          state: { from: props.location.pathname, isAuthenticated },
        }}
      />)
    )}
  />
);

RouteWhenAuthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object,
};

export default RouteWhenAuthorized;
