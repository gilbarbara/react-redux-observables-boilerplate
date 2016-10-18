import { REHYDRATE } from 'redux-persist/constants';

import reducers from 'reducers';
import { ActionTypes } from 'constants/index';

describe('Github', () => {
  it('should return the initial state', () => {
    expect(reducers.github(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} with payload`, () => {
    expect(reducers.github(undefined, { type: REHYDRATE, payload: { github: { logged: true } } })).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} without payload`, () => {
    expect(reducers.github(undefined, { type: REHYDRATE, payload: {} })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.FETCH_POPULAR_REPOS_REQUEST}`, () => {
    expect(reducers.github(undefined, { type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.FETCH_POPULAR_REPOS_SUCCESS}`, () => {
    expect(reducers.github(undefined, {
      type: ActionTypes.FETCH_POPULAR_REPOS_SUCCESS,
      payload: { data: [{ id: 1 }] },
    }))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.FETCH_POPULAR_REPOS_FAILURE}`, () => {
    expect(reducers.github(undefined, {
      type: ActionTypes.FETCH_POPULAR_REPOS_FAILURE,
      payload: { message: 'ajax error 404', status: 404 },
    })).toMatchSnapshot();
  });
});
