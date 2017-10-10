import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import products from './products';
import productsByCat from './productsByCat';
import categories from './categories';

const reducer = combineReducers({user, products, categories, productsByCat});
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true}));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(middleware));

export default store;
export * from './user';
export * from './products';
export * from './productsByCat';
export * from './categories';
