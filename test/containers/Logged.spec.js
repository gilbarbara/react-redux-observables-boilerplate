import React from 'react';
import { mount } from 'enzyme';

import { Logged } from 'containers/Logged';

function setup() {
  const props = {
    dispatch: () => {
    },
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
            description: 'Oh Hai'
          }
        ]
      }
    }
  };

  return mount(<Logged {...props} />);
}

describe('Logged', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
