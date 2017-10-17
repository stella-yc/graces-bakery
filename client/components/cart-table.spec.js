/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CartIcon } from './cart-icon';
import CartTable, { FilledCart, EmptyCart } from './cart-table';
import store from '../store';
import QuantityMenu from './quantityMenu';

describe('CartTable', () => {
  const dummyProds = [
    {
      id: 2,
      name: 'Pineapple Shortcake',
      image: '/img/pineappleCake.jpg',
      price: '20.00',
      CartDetail: {
        quantity: 3
      }
    },
    {
      id: 3,
      name: 'Mango Shortcake',
      image: '/img/mangoCake.jpg',
      price: '25.00',
      CartDetail: {
        quantity: 1
      }
    }
  ];

  it('If there are no products, it renders EmptyCart', () => {
    let wrapper = shallow(
      <CartTable
        products={[]}
      />
    );
    expect(wrapper.find(EmptyCart)).to.have.length(1);
    expect(wrapper.find(FilledCart)).to.have.length(0);
  });

  it('If there are products, it renders FilledCart', () => {
    let wrapper = shallow(
      <CartTable
        products={dummyProds}
      />
    );
    expect(wrapper.find(FilledCart)).to.have.length(1);
    expect(wrapper.find(EmptyCart)).to.have.length(0);
  });

  it('FilledCart renders CartIcon', () => {
    let wrapper = mount(
      <Provider store={store}>
        <Router>
          <FilledCart
            products={dummyProds}
          />
        </Router>
      </Provider>
    );
    expect(wrapper.find(CartIcon)).to.have.length(2);
  });

});
