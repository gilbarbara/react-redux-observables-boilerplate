/**
 * @module Epics/userLogin
 * @desc User
 */

import { Observable } from 'rxjs/Observable';

import { ActionTypes } from 'constants/index';
import { goTo } from 'actions';

export function userLogin(action$) {
  return action$.ofType(ActionTypes.USER_LOGIN_REQUEST)
    .delay(1000)
    .mergeMap(() => Observable.merge(
      Observable.of({ type: ActionTypes.USER_LOGIN_SUCCESS }),
      Observable.of(goTo('/private'))
    ))
    .catch(/* istanbul ignore next  */ error => Observable.of({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: { error },
      error: true
    }));
}

export function userLogout(action$) {
  return action$.ofType(ActionTypes.USER_LOGOUT_REQUEST)
    .mergeMap(() => Observable.merge(
      Observable.of({ type: ActionTypes.USER_LOGOUT_SUCCESS }),
      Observable.of(goTo('/'))
    ))
    .catch(/* istanbul ignore next  */ error => Observable.of({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: { error },
      error: true
    }));
}
