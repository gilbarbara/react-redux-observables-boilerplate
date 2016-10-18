import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rootEpic from 'epics';
import { createEpicMiddleware } from 'redux-observable';

export const epicMiddleware = createEpicMiddleware(rootEpic);

export default configureMockStore([thunk, epicMiddleware]);
