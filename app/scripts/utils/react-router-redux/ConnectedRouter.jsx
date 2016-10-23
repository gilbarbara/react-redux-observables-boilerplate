/*eslint-disable react/no-multi-comp */
import React, { Component, PropTypes } from 'react';
import BrowserHistory from 'react-history/BrowserHistory';
import StaticRouter from 'react-router/StaticRouter';

import { LOCATION_CHANGE } from './reducer';

class DispatchingRouter extends Component {
  constructor(props) {
    super(props);
    this.handleLocationChange(this.props);
  }

  static propTypes = {
    action: PropTypes.string,
    basename: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    store: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    this.handleLocationChange(nextProps);
  }

  handleLocationChange = ({ store, action, location }) => {
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: { action, location },
    });
  };

  render() {
    const { history, action, location, basename, ...props } = this.props;

    return (
      <StaticRouter
        action={action}
        location={location}
        basename={basename}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...props}
      />);
  }
}

class ConnectedRouter extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  static propTypes = {
    basename: PropTypes.string,
    history: PropTypes.func,
    keyLength: PropTypes.number,
    store: PropTypes.object,
  };

  static defaultProps = {
    history: BrowserHistory,
  };

  render() {
    const { history: History, basename, keyLength, ...props } = this.props;

    return (
      <History basename={basename} keyLength={keyLength}>
        {({ history, action, location }) =>
          (
            <DispatchingRouter
              store={this.context.store || this.props.store}
              history={history}
              action={action}
              location={location}
              basename={basename}
              {...props}
            />)
        }
      </History>
    );
  }
}

export default ConnectedRouter;
