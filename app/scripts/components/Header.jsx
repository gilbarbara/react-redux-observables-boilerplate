import React from 'react';

import { goTo, logOut } from 'actions';
import config from 'config';
import Logo from 'components/Logo';
import store from 'store';

const { dispatch } = store;

const onClickLogo = e => {
  e.preventDefault();
  dispatch(goTo(e.currentTarget.getAttribute('href')));
};

const onClickLogout = e => {
  e.preventDefault();
  dispatch(logOut());
};

const Header = () =>
  (<header className="app__header">
    <div className="app__container">
      <a href="/" className="app__header__logo" onClick={onClickLogo}><Logo /></a>
      <h1>{config.title}</h1>
      <div className="app__header__menu">
        <ul className="list-unstyled">
          <li>
            <a href="#logout" className="app__header__logout" onClick={onClickLogout}>
              <i className="i-sign-out" /><span>logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>);

export default Header;
