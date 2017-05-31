import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Router from 'modules/ReduxRouter';
import RedirectPublic from 'modules/RedirectPublic';
import RedirectProtected from 'modules/RedirectProtected';

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
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { app, dispatch, router, user } = this.props;
    let html = (<Loader />);

    if (app.rehydrated) {
      html = (
        <Router dispatch={dispatch} router={router}>
          <div key="app" className="app">
            <Header dispatch={dispatch} user={user} />
            <main className="app__main">
              <Switch>
                <Route exact path="/" component={Home} />
                <RedirectPublic
                  component={Login}
                  isAuthenticated={user.isAuthenticated}
                  path="/login"
                  exact
                />
                <RedirectProtected
                  component={Private}
                  isAuthenticated={user.isAuthenticated}
                  path="/private"
                  exact
                />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
            <SystemNotifications dispatch={dispatch} app={app} />
          </div>
        </Router>
      );
    }

    return html;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
