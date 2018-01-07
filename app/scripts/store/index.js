import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from 'modules/history';
import rootEpic from 'epics';
import rootReducer from 'reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = persistReducer(
  {
    key: 'rrob', // key is required
    storage, // storage is now required
    whitelist: ['app', 'user'],
  },
  combineReducers({
    ...rootReducer,
    router: routerReducer,
  })
);


const middleware = [
  epicMiddleware,
  routerMiddleware(history),
];

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  middleware.push(createLogger({ collapsed: true }));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });

    module.hot.accept('epics', () => {
      epicMiddleware.replaceEpic(require('epics').default);
    });
  }

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

export { store, persistor };
