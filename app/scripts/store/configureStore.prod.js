import { applyMiddleware, createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpics from 'epics';
import rootReducer from 'reducers';

const epicMiddleware = createEpicMiddleware(rootEpics);
const reducer = combineReducers({ ...rootReducer, routing: routerReducer });

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(epicMiddleware, routerMiddleware(browserHistory))(createStore);

  return createStoreWithMiddleware(reducer, initialState);
};
