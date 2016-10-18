import React from 'react';
import BrowserHistory from 'react-history/BrowserHistory';
import StaticRouter from 'react-router/StaticRouter';
import { shouldComponentUpdate } from 'utils/helpers';

import { setLocation } from 'actions';


export default class ControlledRouter extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const { location: appLocation, children, dispatch } = this.props;

    return (
      <BrowserHistory>
        {({ history, action, location }) => {
          if (location.pathname !== appLocation.pathname) {
            setImmediate(() => {
              dispatch(setLocation(location));
            });
          }

          return (
            <StaticRouter
              action={action}
              blockTransitions={history.block}
              key={appLocation.pathname}
              location={location}
              onPush={history.push}
              onReplace={history.replace}
            >
              {children}
            </StaticRouter>
          );
        }}
      </BrowserHistory>
    );
  }
}
