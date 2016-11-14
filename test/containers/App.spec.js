import React from 'react';
import { shallow } from 'enzyme';

import { App } from 'containers/App';
import Header from 'components/Header';
import Loader from 'components/Loader';
import SystemNotifications from 'components/SystemNotifications';

import mockStore from '../__setup__/mockedStore';

const props = {
  dispatch: () => {
  },
  app: {
    rehydrated: false,
  },
  router: {
    action: 'POP',
    location: {
      pathname: '/',
    },
  },
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(<App {...ownProps} />, {
    context: { store: mockStore() },
    childContextTypes: { store: React.PropTypes.object.isRequired },
  });
}

describe('App', () => {
  let wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should wait for REHYDRATE', () => {
    expect(wrapper.find('.app').length).toBe(0);
    expect(wrapper.find(Loader).length).toBe(1);
  });

  it('should render properly', () => {
    wrapper = setup({
      ...props,
      app: {
        rehydrated: true,
      },
    });

    expect(wrapper.find('.app').length).toBe(1);
    expect(wrapper.find(SystemNotifications).length).toBe(1);
    expect(wrapper.find(Header).length).toBe(1);
  });
});
