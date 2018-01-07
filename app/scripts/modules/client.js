// @flow
/**
 * @module API
 * @desc API functions
 */
import { Observable } from 'rxjs/Observable';
import qs from 'qs';

/**
 * Fetch data with RxJS Ajax
 *
 * @instance
 * @param {Object} action
 * @param {string} [action.endpoint] - URL Endpoint
 * @param {string} [action.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [action.payload] - Request body.
 * @param {Object} [action.headers]
 *
 * @returns {Stream}
 */
export function request(action: Object = {}): Promise<*> {
  const options = {
    body: null,
    crossDomain: true,
    headers: '',
    method: action.method || 'GET',
    responseType: 'json',
    url: action.url,
    withCredentials: true,
  };
  const errors = [];

  if (!action.url) {
    errors.push('`url`');
  }

  if (!action.payload && action.method === 'PUT') {
    errors.push('`payload`');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass ${errors.join(', ')}`);
  }

  if (action.headers) {
    options.headers = action.headers;
  }

  if (action.payload instanceof FormData) {
    options.body = action.payload;
  }
  else if (options.method !== 'GET') {
    options.body = qs.stringify(action.payload);
  }

  return new Promise((resolve, reject) =>
    Observable.ajax(options)
      .subscribe(
        data => resolve(data),
        error => reject(error),
      )
  );
}

/**
 * Parse ajax error
 *
 * @param {Object} error
 * @returns {string}
 */
export function parseError(error: string): string {
  return error || 'Something went wrong';
}
