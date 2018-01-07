import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { login, logOut } from 'actions';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClickLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  };

  handleClickLogout = () => {
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  render() {
    const { user } = this.props;

    const loginBtn = (
      <button
        className="app__header__login btn btn-sm btn-primary btn-icon"
        onClick={this.handleClickLogin}
      >
        <i
          className={cx({
            'i-circle-o-notch i-spin': user.isRunning,
            'i-sign-in': !user.isRunning,
          })}
        />
        <span>Login</span>
      </button>
    );

    const logoutBtn = (
      <button
        className="app__header__logout btn btn-sm btn-outline-primary btn-icon"
        onClick={this.handleClickLogout}
      >
        <i className="i-sign-out" />
        <span>logout</span>
      </button>
    );


    return (
      <header className="app__header">
        <div className="app__container">
          <ul className="app__header__menu">
            <li>
              <NavLink
                to="/"
                className="app__header__link"
                activeClassName="is-active"
                exact
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/private"
                className="app__header__link"
                activeClassName="is-active"
              >
                Private
              </NavLink>
            </li>
            <li>
              {user.isAuthenticated ? logoutBtn : loginBtn}
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
