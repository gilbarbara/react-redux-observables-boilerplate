/**
 * @module Reducers/User
 * @desc User Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  isRunning: false,
  rehydrated: false,
};

export default {
  user: createReducer(userState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.user, {
        rehydrated: true,
      });
    },
    [ActionTypes.USER_LOGIN_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
      };
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return {
        ...state,
        isAuthenticated: true,
        isRunning: false,
      };
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return {
        ...state,
        isAuthenticated: false,
        isRunning: false,
      };
    },
  }),
};
