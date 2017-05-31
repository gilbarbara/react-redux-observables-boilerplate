import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from 'containers/App';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
