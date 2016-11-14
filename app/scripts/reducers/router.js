/**
 * @module Reducers/Router
 * @desc Router Reducer
 */
import createBrowserHistory from 'history/createBrowserHistory';

import { createReducer } from 'utils/helpers';
import { LOCATION_CHANGE } from 'constants/index';

const history = createBrowserHistory();

export const routerState = {
  action: history.action,
  location: history.location,
};

export default {
  router: createReducer(routerState, {
    [LOCATION_CHANGE](state, action) {
      return {
        ...state,
        location: { ...state.location, ...action.location },
        action: action.action,
      };
    },
  }),
};
