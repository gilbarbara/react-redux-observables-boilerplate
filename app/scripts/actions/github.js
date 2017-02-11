// @flow
/**
 * @module Actions/Github
 * @desc Actions for Github
 */

import { ActionTypes } from 'constants/index';

/**
 * fetchPopularRepos
 *
 * @returns {Object}
 */
export function fetchPopularRepos() {
  return {
    type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST,
  };
}
