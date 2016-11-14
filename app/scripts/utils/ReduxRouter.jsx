import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

import { LOCATION_CHANGE } from 'constants/index';

const history = createBrowserHistory();

export default class ReduxRouter extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, router, children } = this.props;

    return (
      <Router
        history={history}
        location={router.location}
        action={router.action}
        onChange={/* istanbul ignore next */(location, action) => {
          if (action === 'SYNC') {
            dispatch({
              type: LOCATION_CHANGE,
              location,
              action: router.action,
            });
          } else if (!window.block) {
            // if you want to block transitions go into the console and type in
            // `window.block = true` and transitions won't happen anymore
            dispatch({
              type: LOCATION_CHANGE,
              location,
              action,
            });
          } else {
            console.log('blocked!'); // eslint-disable-line
          }
        }}
      >
        {children}
      </Router>
    );
  }
}
