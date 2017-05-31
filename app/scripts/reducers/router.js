/**
 * @module Reducers/Router
 * @desc Router Reducer
 */
import { createReducer } from 'utils/helpers';
import { LOCATION_CHANGE } from 'constants/index';
import history from 'modules/history';

const { location } = history;
location.state = {};

export const routerState = {
  action: history.action,
  location,
};

export default {
  router: createReducer(routerState, {
    [LOCATION_CHANGE](state, action) {
      const { payload } = action;

      return {
        ...state,
        location: payload.location,
        action: payload.action,
      };
    },
  }),
};
