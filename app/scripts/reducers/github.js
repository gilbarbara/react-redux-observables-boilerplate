/**
 * @module Reducers/Github
 * @desc Github Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const githubState = {
  popularRepos: {
    data: [],
    error: false,
    isReady: false,
    isLoading: false,
  },
  rehydrated: false,
};

export default {
  github: createReducer(githubState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.github, {
        rehydrated: true,
      });
    },
    [ActionTypes.FETCH_POPULAR_REPOS_REQUEST](state) {
      const popularRepos = { ...state.popularRepos, isLoading: true };

      return { ...state, popularRepos };
    },
    [ActionTypes.FETCH_POPULAR_REPOS_SUCCESS](state, action) {
      const popularRepos = {
        ...state.popularRepos,
        data: action.payload.data,
        isLoading: false,
        isReady: true,
      };

      return { ...state, popularRepos };
    },
    [ActionTypes.FETCH_POPULAR_REPOS_FAILURE](state, action) {
      const popularRepos = {
        ...state.popularRepos,
        ...action.payload,
        isLoading: false,
        isReady: false,
        error: true,
      };

      return { ...state, popularRepos };
    },
  }),
};
