import React from 'react';
import { mount } from 'enzyme';

import { Private } from 'containers/Private';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    dispatch: mockDispatch,
    location: {},
    github: {
      popularRepos: {
        isReady: true,
        isLoading: false,
        data: [
          {
            name: 'Repo',
            html_url: 'http://...',
            owner: { login: 'github' },
            description: 'Oh Hai',
          },
        ],
      },
    },
  };

  return mount(<Private {...props} />);
}

describe('Private', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    wrapper.setProps({
      github: {
        popularRepos: {
          isReady: false,
          data: [],
        },
      },
    });

    wrapper.find('.btn').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'FETCH_POPULAR_REPOS_REQUEST' });
  });
});
