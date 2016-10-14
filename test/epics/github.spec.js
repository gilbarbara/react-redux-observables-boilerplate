import nock from 'nock';
import { ActionTypes } from 'constants/index';
import rootEpic from 'epics';
import mockStore, { epicMiddleware } from '../lib/mockedStore';

describe('github', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(rootEpic);
  });

  xit('fetchPopularRepos epic', done => {
    const payload = { id: 123 };

    nock('https://api.github.com')
      .get('/search/repositories?q=+language:javascript+created:%3E2016-10-01&sort=stars&order=desc')
      .reply(200, payload);

    store.dispatch({ type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST });

    expect(store.getActions()).toEqual([
      { type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST },
      { type: ActionTypes.FETCH_POPULAR_REPOS_SUCCESS }
    ]);

  });
});
