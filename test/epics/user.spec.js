import rootEpic from 'epics';
import { ActionTypes } from 'constants/index';
import mockStore, { epicMiddleware } from '../__setup__/mockedStore';

describe('user', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(rootEpic);
  });

  it('userLogin should return SUCCESS', done => {
    store.dispatch({ type: ActionTypes.USER_LOGIN_REQUEST });

    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.USER_LOGIN_REQUEST },
        { type: ActionTypes.USER_LOGIN_SUCCESS },
      ]);

      done();
    }, 1000);
  });

  it('userLogout epic', done => {
    store.dispatch({ type: ActionTypes.USER_LOGOUT_REQUEST });

    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.USER_LOGOUT_REQUEST },
        { type: ActionTypes.USER_LOGOUT_SUCCESS },
      ]);

      done();
    }, 1000);
  });
});
