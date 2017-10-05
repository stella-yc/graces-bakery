/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import reducer, {
  allProducts,
  singleProduct,
  newProduct,
  updateProductInfo,
  deleteProductInfo
} from './products';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Product thunk creators', () => {
  let store;

  const initialState = {
    products: [],
    product: {}
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('allProducts', () => {
    xit('eventually dispatches the GET_PRODUCTS action', () => {
      const fakeProducts =
      [{id: 1,
          name: 'brownies',
          price: 100,
          image: 'jade-wulfraat-96023.jpg'
        }];
      mockAxios.onGet('/api/products/').reply(200, fakeProducts);
      return axios.get('/api/products/')
        .then(res => console.log(res.data));
    //   return store.dispatch(allProducts())
    //     .then(() => {
    //       const actions = store.getActions();
    //       console.log('actions****', actions);
    //       expect(actions[0].type).to.be.equal('GET_PRODUCTS');
    //       expect(actions[0].user).to.be.deep.equal(fakeProducts);
    //     });
    });
  });

});

describe('Products - Reducer', () => {
  const defaultState = {
    products: [],
    product: {}
  };
  const product = {id: 1, name: 'Brownies'};
  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(defaultState);
  });
  it('should handle GET_PRODUCTS', () => {
    let action = {type: 'GET_PRODUCTS', products: [product]};
    let newState = {products: [product], product: {}};
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle GET_PRODUCT', () => {
    let action = {type: 'GET_PRODUCT', product: product};
    let newState = {products: [], product: product};
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle ADD_PRODUCT', () => {
    let action = {type: 'ADD_PRODUCT', product: product};
    let newState = {products: [], product: product};
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle UPDATE_PRODUCT', () => {
    let action = {type: 'UPDATE_PRODUCT', product: product};
    let newState = {products: [], product: product};
    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
  it('should handle DELETE_PRODUCT', () => {
    let action = {type: 'DELETE_PRODUCT', product: product};
    let products = [
      {id: 1, name: 'Brownies'},
      {id: 2, name: 'Cookies'},
      {id: 3, name: 'Bagel'}
    ];
    let updatedProducts = [
      {id: 2, name: 'Cookies'},
      {id: 3, name: 'Bagel'}
    ];
    let oldState = {products: products, product: product};
    let newState = {products: updatedProducts, product: {}};
    expect(reducer(oldState, action)).to.deep.equal(newState);
  });
});
