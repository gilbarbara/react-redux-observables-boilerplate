import React from 'react';
import { shallow } from 'enzyme';

import { App } from 'containers/App';

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
  return shallow(<App {...ownProps} />);
}

describe('App', () => {
  let wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should wait for REHYDRATE', () => {
    expect(wrapper.find('.app').length).toBe(0);
    expect(wrapper.find('Loader').length).toBe(1);
  });

  it('should render properly', () => {
    wrapper = setup({
      ...props,
      app: {
        rehydrated: true,
      },
    });

    expect(wrapper.find('.app').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Footer').length).toBe(1);
    expect(wrapper.find('SystemNotifications').length).toBe(1);
  });

  it('should have all the Router components', () => {
    expect(wrapper.find('ReduxRouter').length).toBe(1);
    expect(wrapper.find('Route').length).toBe(2);
    expect(wrapper.find('RedirectProtected').length).toBe(1);
    expect(wrapper.find('RedirectPublic').length).toBe(1);
  });
});
