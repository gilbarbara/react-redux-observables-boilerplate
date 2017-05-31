import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';

import { LOCATION_CHANGE } from '../constants/index';

export const history = createBrowserHistory();

class ReduxRouter extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.unsubscribe = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleLocationChange = (location, action) => {
    const { dispatch } = this.props;

    dispatch({
      type: LOCATION_CHANGE,
      location,
      action,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
}

export const { push, replace, go, goBack, goForward } = history;

export default ReduxRouter;
