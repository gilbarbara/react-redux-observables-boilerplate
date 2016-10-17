/**
 * @namespace Constants
 * @desc App constants
 */


import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  USER_LOGIN_REQUEST: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT_REQUEST: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  FETCH_POPULAR_REPOS_REQUEST: undefined,
  FETCH_POPULAR_REPOS_SUCCESS: undefined,
  FETCH_POPULAR_REPOS_FAILURE: undefined,
  FETCH_POPULAR_REPOS_CANCEL: undefined,
  CANCEL_FETCH: undefined,
  LOCATION_CHANGE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined
});

/**
 * @constant {Object} XHR
 * @memberof Constants
 */
export const XHR = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined
});
