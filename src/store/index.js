import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';
const middlewareList = [thunk, logger];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewareList)));

export default store;
