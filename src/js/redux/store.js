import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'; //logger with default options
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './modules/index.js'

// https://redux.js.org/basics/reducers#note-for-es6-savvy-users
// Because combineReducers expects an object, we can put all top-level reducers into a separate file, 
// export each reducer function, and use import * as reducers to get them as an object with their names as the keys:
const rootReducer = combineReducers(reducers);

const middlewares = [loggerMiddleware, thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)

// const store = createStore(reducer, applyMiddleware(logger, composeWithDevTools));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunkMiddleware)));

export default store;
