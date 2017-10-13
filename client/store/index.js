import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import product from './product';
import productsByCat from './productsByCat';
import categories from './categories';
import cart from './cart';

const reducer = combineReducers({user, product, categories, productsByCat, cart});
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true}));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(middleware));

export default store;
export * from './user';
export * from './product';
export * from './productsByCat';
export * from './categories';
export * from './cart';
