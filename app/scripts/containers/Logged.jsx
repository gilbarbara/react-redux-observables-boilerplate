import React from 'react';

import store from 'store';
import readme from '../../../README.md';

const { dispatch } = store;

const handleClickFetch = e => {
  e.preventDefault();

  dispatch({ type: 'FETCH' });
};

const handleClickCancel = e => {
  e.preventDefault();

  dispatch({ type: 'CANCEL' });
};

const Logged = () => (
  <div key="Logged" className="app__logged app__route">
    <a href="#load" className="btn btn-primary" onClick={handleClickFetch}>Load</a>
    <a href="#cancel" className="btn btn-primary" onClick={handleClickCancel}>Cancel</a>
    <div className="app__container" dangerouslySetInnerHTML={{ __html: readme }} />
  </div>
);

export default Logged;
