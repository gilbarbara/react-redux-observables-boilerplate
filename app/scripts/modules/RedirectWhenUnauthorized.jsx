import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectWhenUnauthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ?
      (<Redirect to="/private" />) :
      (<Component {...props} />)
    )}
  />
);

RedirectWhenUnauthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};

export default RedirectWhenUnauthorized;
