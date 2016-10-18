import React from 'react';
import { mount } from 'enzyme';

import Login from 'containers/Login';

function setup() {
  const props = {
    location: {},
  };

  return mount(<Login {...props} />);
}

describe('Login', () => {
  const wrapper = setup(true);

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the redirect location', () => {
    wrapper.setProps({
      location: {
        state: { from: '/private' },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
