import reducers from 'reducers';
import * as Actions from 'actions';
import { LOCATION_CHANGE } from 'constants/index';

describe('Router', () => {
  it('should return the initial state', () => {
    expect(reducers.router(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${LOCATION_CHANGE}`, () => {
    expect(reducers.router(undefined, Actions.goTo('/'))).toMatchSnapshot();
  });
});
