import React from 'react';
import PropTypes from 'prop-types';
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
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default RedirectWhenUnauthorized;
