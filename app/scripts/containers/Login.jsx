import React from 'react';

const Login = ({ location: { state } }) => (
  <div key="login" className="app__login app__route">
    <div className="app__container">
      <h1>{`You must login to view ${state ? `the page at ${state.from}` : 'this page'}`}</h1>
    </div>
  </div>
);

Login.propTypes = {
  location: React.PropTypes.object.isRequired
};

export default Login;
