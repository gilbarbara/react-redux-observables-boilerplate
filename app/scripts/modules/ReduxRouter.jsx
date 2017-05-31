import React from 'react';
import PropTypes from 'prop-types';
import Router from 'react-router-dom/Router';
import history from 'modules/history';

import { LOCATION_CHANGE } from '../constants/index';

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
      payload: {
        location,
        action,
      },
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
