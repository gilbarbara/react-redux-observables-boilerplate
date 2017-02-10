import React from 'react';
import { mount } from 'enzyme';

import Header from 'components/Header';

jest.mock('react-router-dom/NavLink', () =>
  (({ to, children }) => (<a href={to}>{children}</a>))
);

const mockDispatch = jest.fn();
function setup() {
  const props = {
    dispatch: mockDispatch,
    user: {
      isAuthenticated: false,
    },
  };

  return mount(<Header {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle login click', () => {
    wrapper.find('.app__header__login').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'USER_LOGIN_REQUEST' });
  });

  it('should handle logout click', () => {
    wrapper.setProps({
      user: {
        isAuthenticated: true,
      },
    });

    wrapper.find('.app__header__logout').simulate('click');
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: 'USER_LOGOUT_REQUEST' });
  });
});

