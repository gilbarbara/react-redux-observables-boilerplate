import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-js';
import createReactotronTrackingEnhancer from 'reactotron-redux';

import rootEpic from 'epics';
import rootReducer from 'reducers';

import { ActionTypes } from 'constants/index';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({ ...rootReducer, routing: routerReducer });

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true
});

/* istanbul ignore next */
const newStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, epicMiddleware, routerMiddleware(browserHistory), logger),
    createReactotronTrackingEnhancer(Reactotron, {
      isActionImportant: action => action.type === ActionTypes.USER_LOGIN_SUCCESS
    })
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

export default newStore;
