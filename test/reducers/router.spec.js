import { LOCATION_CHANGE } from 'constants/index';

import reducers from 'reducers';
import { routerState } from 'reducers/router';

describe('reducers/router', () => {
  it('should return the initial state', () => {
    const state = reducers.router(undefined, {});

    expect(state).toEqual(routerState);
  });

  it(`should handle ${LOCATION_CHANGE}`, () => {
    const state = reducers.router(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        action: 'push',
        location: {
          pathname: '/home',
        },
      },
    });

    expect(state.location.pathname).toBe('/home');
  });
});
