import React from 'react';
import { shallow } from 'enzyme';

import { App } from 'containers/App';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemNotifications from 'components/SystemNotifications';

import mockStore from '../lib/mockedStore';

function setup() {
  const props = {
    dispatch: () => {
    },
    app: {
      location: { pathname: '/login' },
      notifications: {
        visible: false,
        message: '',
        status: '',
        withTimeout: true,
      },
    },
    user: {
      isAuthenticated: false,
    },
  };

  return shallow(<App {...props} />, {
    context: { store: mockStore() },
    childContextTypes: { store: React.PropTypes.object.isRequired },
  });
}

describe('App', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should have Header', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('should have Footer', () => {
    expect(wrapper.find(Footer).length).toBe(1);
  });

  it('should have SystemNotifications', () => {
    expect(wrapper.find(SystemNotifications).length).toBe(1);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__main').length).toBe(1);
    expect(wrapper.text()).toMatchSnapshot();
  });
});
