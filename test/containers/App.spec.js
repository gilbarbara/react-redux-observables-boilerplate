import React from 'react';
import { shallow } from 'enzyme';

import { App } from 'containers/App';

function setup() {
  const props = {
    dispatch: () => {
    },
    app: {
      location: { pathname: '/' },
      notifications: {
        visible: false,
        message: '',
        status: '',
        withTimeout: true
      }
    },
    user: {
      isAuthenticated: false
    }
  };

  return shallow(<App {...props} />);
}

describe('App', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
