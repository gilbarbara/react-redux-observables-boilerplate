import xhrMock from 'xhr-mock';
import { ActionTypes } from 'constants/index';
import rootEpic from 'epics';
import mockStore, { epicMiddleware } from '../__setup__/mockedStore';

describe('github', () => {
  let store;

  beforeEach(() => {
    xhrMock.setup();
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(rootEpic);
  });

  it('fetchPopularRepos should return SUCCESS', done => {
    const payload = { items: [{ id: 123 }] };

    xhrMock.get('https://api.github.com/search/repositories?q=+language:javascript+created:%3E2016-10-01&sort=stars&order=desc', (req, res) =>
      res
        .status(200)
        .header('Content-Type', 'application/json')
        .body(payload)
    );

    store.dispatch({ type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST });

    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST },
        {
          type: ActionTypes.FETCH_POPULAR_REPOS_SUCCESS,
          payload: { data: [{ id: 123 }] },
        },
      ]);

      done();
    }, 100);
  });

  it('fetchPopularRepos should return FAILURE', done => {
    xhrMock.get('https://api.github.com/search/repositories?q=+language:javascript+created:%3E2016-10-01&sort=stars&order=desc', (req, res) =>
      res
        .status(404)
    );

    store.dispatch({ type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST });

    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.FETCH_POPULAR_REPOS_REQUEST },
        {
          type: ActionTypes.FETCH_POPULAR_REPOS_FAILURE,
          payload: { message: 'ajax error 404', status: 404 },
          error: true,
        },
      ]);

      done();
    }, 100);
  });
});
