// @flow

/**
 * Helper functions
 * @module Helpers
 */

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState: Object, handlers: Object): Function {
  return function reducer(state: Object = initialState, action: Object): Object {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}
