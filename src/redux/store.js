import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

// middleware
const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Allow browser to cache data ... creates new provider
// Created persisted version of the store
export const persistor = persistStore(store);
