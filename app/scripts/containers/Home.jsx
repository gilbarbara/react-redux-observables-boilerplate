import React from 'react';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
import { shouldComponentUpdate } from 'utils/helpers';

import config from 'config';

import Logo from 'components/Logo';

export class Home extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <div key="Home" className="app__home app__route">
        <div className="app__home__intro">
          <div className="app__container">
            <div className="app__home__header">
              <Logo />
            </div>
            <h1>{config.title}</h1>
            <p>{config.description}</p>
            <a
              href="https://github.com/gilbarbara/react-redux-observables-boilerplate"
              className="app__home__download btn btn-lg btn-primary btn-icon"
              target="_blank"
            >
              <i className="i-github" />
              <span>Download</span>
            </a>
          </div>
        </div>
        <div className="app__home__libraries">
          <div className="app__container">
            <h2>Provides</h2>
            <ul>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/react.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>React</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/redux.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>Redux</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/redux-observable.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>Redux Observable</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/react-router.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>react-router</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/reactivex.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>RxJS</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="app__home__library">
                  <div className="app__home__library__image">
                    <SVG src={require('assets/media/logos/webpack.svg')} />
                  </div>
                  <div className="app__home__library__content">
                    <h4>Webpack 2.x</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
