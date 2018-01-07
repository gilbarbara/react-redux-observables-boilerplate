import React from 'react';
import { shallow } from 'enzyme';
import immutable from 'immutability-helper';

import { App } from 'containers/App';

jest.mock('uuid/v4', () => () => '123-456');

const mockDispatch = jest.fn();
const props = {
  app: {
    alerts: [],
  },
  dispatch: mockDispatch,
  router: {},
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(<App {...ownProps} />);
}

describe('App', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app')).toBePresent();
    expect(wrapper.find('Header')).toBePresent();
    expect(wrapper.find('Footer')).toBePresent();
    expect(wrapper.find('SystemAlerts')).toBePresent();
  });

  it('should have all the Router components', () => {
    expect(wrapper.find('ConnectedRouter')).toBePresent();
    expect(wrapper.find('Route').length).toBe(2);
    expect(wrapper.find('RoutePrivate')).toBePresent();
    expect(wrapper.find('RoutePublic')).toBePresent();
  });

  it('should handle authentication changes', () => {
    const instance = wrapper.instance();
    wrapper.setProps(immutable(instance.props, {
      user: {
        isAuthenticated: { $set: true },
      },
    }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SHOW_ALERT',
      payload: {
        icon: 'i-flash',
        id: '123-456',
        message: 'Hello!',
        position: 'bottom-right',
        timeout: 5,
        type: 'primary',
      },
    });
  });
});
