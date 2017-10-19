/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router } from 'react-router-dom';

import { Products } from './products';
import ProductIcon from './product-icon';
import store from '../store';

describe('Products Component', () => {
  const products = [{
    id: 1,
    name: 'Curry Bun',
    description: 'Yummy',
    image: '/img/cookies.jpg',
    price: '9.99'
  }];

  const category = {
    id: 1,
    name: 'buns',
    description: 'Yummy goods',
    displayName: 'Buns'
  };

  const match = {
    params: {
      cid: 1
    }
  };

  const placeholder = () => true;

  it('on componentDidMount, fetchProducts is invoked', () => {
    const spy = sinon.spy();
    expect(spy.called).to.be.equal(false);
    const wrapper = mount(
        <Router>
          <Products
            category={category}
            products={products}
            match={match}
            fetchProducts={spy}
            clearProductsStore={placeholder}
          />
        </Router>,
        {context: { store }}
      );
    expect(spy.calledOnce).to.be.equal(true);
    expect(spy.calledWithExactly(match.params.cid)).to.equal(true);
  });
  it('on componentWillReceiveProps, if match.params.cid changes, fetchProducts is invoked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Products
        category={category}
        products={products}
        match={match}
        fetchProducts={spy}
        clearProductsStore={placeholder}
      />
      );
    expect(spy.called).to.be.equal(false);
    wrapper.setProps({match: { params: { cid: 2 }}});
    expect(spy.calledOnce).to.be.equal(true);
    expect(spy.calledWithExactly(2)).to.equal(true);
  });

  it('on componentWillUnmount, clearProductStore is invoked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Products
        category={category}
        products={products}
        match={match}
        fetchProducts={placeholder}
        clearProductsStore={spy}
      />
      );
    expect(spy.called).to.be.equal(false);
    wrapper.unmount();
    expect(spy.calledOnce).to.be.equal(true);
  });

  it('if products is not supplied, renders nothing', () => {
    const wrapper = shallow(
      <Products
        category={category}
        match={match}
        fetchProducts={placeholder}
        clearProductsStore={placeholder}
      />
      );
    expect(wrapper.find('div')).to.have.length(0);
    expect(wrapper.find('.cat-description')).to.have.length(0);
  });

  it('renders ProductIcon', () => {
    const wrapper = shallow(
      <Products
        category={category}
        products={products}
        match={match}
        fetchProducts={placeholder}
        clearProductsStore={placeholder}
      />
    );
    expect(wrapper.find('div')).to.have.length(3);
    expect(wrapper.find('.cat-description')).to.have.length(1);
    expect(wrapper.find(ProductIcon)).to.have.length(1);
  });

});
