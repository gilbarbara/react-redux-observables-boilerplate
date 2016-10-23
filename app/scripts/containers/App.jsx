import React from 'react';
import { connect } from 'react-redux';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import { MatchWhenAuthorized, RedirectWhenAuthorized } from 'utils/router';
import { ConnectedRouter } from 'utils/react-router-redux';

import Home from 'containers/Home';
import Private from 'containers/Private';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';

import Loader from 'components/Loader';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemNotifications from 'components/SystemNotifications';

export class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
  };

  render() {
    const { app, dispatch, user } = this.props;
    let html = (<Loader />);

    if (app.rehydrated) {
      html = (
        <ConnectedRouter>
          <div key="app" className="app">
            <Header dispatch={dispatch} user={user} />
            <main className="app__main">
              <Match exactly={true} pattern="/" component={Home} />
              <RedirectWhenAuthorized
                exactly={true}
                pattern="/login"
                component={Login}
                isAuthenticated={user.isAuthenticated}
              />
              <MatchWhenAuthorized
                exactly={true}
                pattern="/private"
                component={Private}
                isAuthenticated={user.isAuthenticated}
              />
              <Miss component={NotFound} />
            </main>
            <Footer />
            <SystemNotifications dispatch={dispatch} app={app} />
          </div>
        </ConnectedRouter>
      );
    }

    return html;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
