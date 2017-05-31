import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ location: { state } }) => (
  <div key="login" className="app__login app__route">
    <div className="app__container">
      <h1>{`You must login to view ${state ? `the page at ${state.from}` : 'this page'}`}</h1>
    </div>
  </div>
);

Login.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Login;
