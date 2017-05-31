import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { login, logOut } from 'actions';
import { NavLink } from 'react-router-dom';

const onClickLogin = dispatch =>
  e => {
    e.preventDefault();

    dispatch(login());
  };

const onClickLogout = dispatch =>
  e => {
    e.preventDefault();

    dispatch(logOut());
  };

const Header = ({ dispatch, user }) =>
  (<header className="app__header">
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
          {user.isAuthenticated ?
           (<a
             href="#logout"
             className="app__header__logout btn btn-sm btn-secondary btn-icon"
             onClick={onClickLogout(dispatch)}
           >
             <i className="i-sign-out" />
             <span>logout</span>
           </a>) :
           (<a
             href="#login"
             className="app__header__login btn btn-sm btn-primary btn-icon"
             onClick={onClickLogin(dispatch)}
           >
             <i
               className={cx({
                 'i-circle-o-notch i-spin': user.isRunning,
                 'i-sign-in': !user.isRunning })}
             />
             <span>Login</span>
           </a>)}
        </li>
      </ul>
    </div>
  </header>);

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Header;
