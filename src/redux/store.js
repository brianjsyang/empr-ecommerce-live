import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// middleware
const middlewares = [thunk];

// Only log when in localhost development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Allow browser to cache data ... creates new provider
// Created persisted version of the store
export const persistor = persistStore(store);
