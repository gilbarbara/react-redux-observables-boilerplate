import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RedirectProtected = ({ component: Component, isAuthenticated, ...rest }) => (
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

RedirectProtected.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default RedirectProtected;
