import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { routerReducer } from 'utils/react-router-redux';

import rootEpics from 'epics';
import rootReducer from 'reducers';

const epicMiddleware = createEpicMiddleware(rootEpics);
const reducer = combineReducers({ ...rootReducer, router: routerReducer });

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(thunk, epicMiddleware)(createStore);

  return createStoreWithMiddleware(reducer, initialState);
};
