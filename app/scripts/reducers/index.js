/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import github from './github';
import router from './router';
import user from './user';

export default {
  ...app,
  ...github,
  ...router,
  ...user,
};
