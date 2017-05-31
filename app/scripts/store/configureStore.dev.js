import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import { createLogger } from 'redux-logger';

import rootEpic from 'epics';
import rootReducer from 'reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({ ...rootReducer });

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true,
});

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, epicMiddleware, logger)
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });

    module.hot.accept('epics', () => {
      epicMiddleware.replaceEpic(require('epics').default);
    });
  }

  return store;
};

export default configStore;
