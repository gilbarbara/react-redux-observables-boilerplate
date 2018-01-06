// @flow
/**
 * @module Actions/User
 * @desc Actions for User
 */

import { ActionTypes } from 'constants/index';

/**
 * Login
 *
 * @returns {Object}
 */
export function login(): Object {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: {},
  };
}

/**
 * Logout
 *
 * @returns {Object}
 */
export function logOut(): Object {
  return {
    type: ActionTypes.USER_LOGOUT_REQUEST,
    payload: {},
  };
}
