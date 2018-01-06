// @flow
/**
 * @module Actions/App
 * @desc App Actions
 */
import { go, goBack, push, replace } from 'react-router-redux';
import uuid from 'uuid/v4';

import { ActionTypes } from 'constants/index';

export { go, goBack, push, replace };

/**
 * Hide alert.
 *
 * @param {string} id
 * @returns {Object}
 */
export function hideAlert(id: string): Object {
  return {
    type: ActionTypes.HIDE_ALERT,
    payload: { id },
  };
}

/**
 * Show an alert.
 *
 * @param {string} message
 * @param {Object} options
 * @param {string} options.type - Type of the alert. Available: success, error, warning, info, black
 * @param {number} [options.timeout] - Delay in seconds for the notification go away. Set this to 0 to not auto-dismiss the notification
 * @param {string} [options.position]
 * @param {string} [options.icon]
 *
 * @returns {Object}
 */
export function showAlert(message: string, options: Object): Object {
  const timeout = options.type === 'error' ? 0 : 5;

  return {
    type: ActionTypes.SHOW_ALERT,
    payload: {
      id: options.id || uuid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      type: options.type,
      timeout: !isNaN(options.timeout) ? options.timeout : timeout,
    },
  };
}
