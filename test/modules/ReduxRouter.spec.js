import React from 'react';
import { mount } from 'enzyme';

import ReduxRouter from 'modules/ReduxRouter';

const mockUnsubscribe = jest.fn();
const mockListen = jest.fn(() => mockUnsubscribe);

jest.mock('history/createBrowserHistory', () => {
  const history = require.requireActual('history/createBrowserHistory');

  return () => ({
    ...history.default(),
    listen: handler => mockListen(handler),
  });
});

const mockDispatch = jest.fn();

function setup() {
  const props = {
    dispatch: mockDispatch,
  };

  return mount(
    <ReduxRouter {...props}>
      <div className="test" />
    </ReduxRouter>,
    { attachTo: document.getElementById('react') }
  );
}

describe('ReduxRouter', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('Router').length).toBe(1);
    expect(wrapper.find('.test').length).toBe(1);
  });

  it('should handle history changes', () => {
    expect(mockListen.mock.calls.length).toBe(2);

    mockListen.mock.calls[1][0]('/test', 'PUSH');
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: '@@router/LOCATION_CHANGE',
      payload: {
        action: 'PUSH',
        location: '/test',
      },
    });
  });

  it('should be able to unmount the component', () => {
    wrapper.unmount();
    expect(mockUnsubscribe.mock.calls.length).toBe(2);
    expect(wrapper.find('.test').length).toBe(0);
  });
});
