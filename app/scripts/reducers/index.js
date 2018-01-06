/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import github from './github';
import user from './user';

export default {
  ...app,
  ...github,
  ...user,
};
