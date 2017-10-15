/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import reducer, {
  singleProduct,
  newProduct,
  updateProductInfo,
  deleteProductInfo
} from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Product thunk creators', () => {
  let store;

  const initialState = {};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('singleProduct', () => {
    xit('eventually dispatches the GET_PRODUCT action', () => {
      const fakeProduct =
        {
          id: 1,
          name: 'brownies',
          price: 100,
          image: 'jade-wulfraat-96023.jpg'
        };
      mockAxios.onGet('/api/product/1').reply(200, fakeProduct);
      return store.dispatch(singleProduct(1))
        .then(() => {
          const actions = store.getActions();
          console.log('actions****', actions);
          expect(actions[0].type).to.be.equal('GET_PRODUCT');
          expect(actions[0].product).to.be.deep.equal(fakeProduct);
        });
    });
  });

});

describe('Products - Reducer', () => {
  const defaultState = {};
  const product = { id: 1, name: 'Brownies' };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(defaultState);
  });
  it('should handle GET_PRODUCT', () => {
    let action = {type: 'GET_PRODUCT', product: product};
    let newState = product;
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle ADD_PRODUCT', () => {
    let action = {type: 'ADD_PRODUCT', product: product};
    let newState = product;
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle UPDATE_PRODUCT', () => {
    let action = {type: 'UPDATE_PRODUCT', product: product};
    let newState = product;
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle DELETE_PRODUCT', () => {
    let action = {type: 'DELETE_PRODUCT', product: product};
    let oldState = product;
    let newState = defaultState;
    expect(reducer(oldState, action)).to.deep.equal(newState);
  });
});
