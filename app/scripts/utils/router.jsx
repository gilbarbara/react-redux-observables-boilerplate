import React from 'react';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

const MatchAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Match
    {...rest}
    render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location.pathname, isAuthenticated },
        }} />
    )
  )} />
);

MatchAuthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object,
};

export const MatchWhenAuthorized = MatchAuthorized;

const RedirectAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Match
    {...rest}
    render={props => (
    isAuthenticated ? (
      <Redirect to="/private" />
    ) : (
      <Component {...props} />
    )
  )} />
);

RedirectAuthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};

export const RedirectWhenAuthorized = RedirectAuthorized;
