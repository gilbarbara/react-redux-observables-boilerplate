import React from 'react';
import { shallow } from 'enzyme';

import ReduxRouter from 'utils/ReduxRouter';
import { routerState } from 'reducers/router';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    dispatch: mockDispatch,
    router: routerState,
  };

  return shallow(
    <ReduxRouter {...props}>
      <div className="test" />
    </ReduxRouter>
  );
}

describe('ReduxRouter', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.text()).toBe('<ControlledBrowserRouter />');
    expect(wrapper.find('.test').length).toBe(1);
  });
});
