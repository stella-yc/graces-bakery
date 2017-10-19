/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';

import { Product } from './product';
import QuantityMenu from './quantityMenu';
import store from '../store';

describe('Product Component', () => {
  const bun = {
    id: 1,
    name: 'Curry Bun',
    description: 'Yummy',
    image: '/img/cookies.jpg',
    price: '9.99'
  };

  const cart = {
    id: 1
  };

  const match = {
    params: {
      pid: 1
    }
  };

  const placeholder = () => true;

  it('on componentDidMount, fetchProductInfo is invoked', () => {
    const spy = sinon.spy();
    expect(spy.called).to.be.equal(false);
    const wrapper = mount(
        <Router>
          <Product
            product={bun}
            cart={cart}
            fetchProductInfo={spy}
            addToCart={placeholder}
            clearProduct={placeholder}
            match={match}
          />
        </Router>,
        {context: { store }}
      );
    expect(spy.calledOnce).to.be.equal(true);
    expect(spy.calledWithExactly(match.params.pid)).to.equal(true);
  });

  it('on componentWillReceiveProps, if match.params.pid changes, fetchProductInfo is invoked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Product
        product={{}}
        cart={cart}
        fetchProductInfo={spy}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={{ params: { pid: 2 }}}
      />
      );
    expect(spy.called).to.be.equal(false);
    wrapper.setProps({match: match});
    expect(spy.calledOnce).to.be.equal(true);
    expect(spy.calledWithExactly(match.params.pid)).to.equal(true);
  });

  it('on componentWillReceiveProps, if nextProps includes a valid product, showProducts state will be true', () => {
    const wrapper = shallow(
      <Product
        product={{}}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={match}
      />
      );
    expect(wrapper.state('showProducts')).to.equal(false);
    wrapper.setProps({product: bun});
    expect(wrapper.state('showProducts')).to.equal(true);
  });

  it('on componentWillUnmount, clearProduct is invoked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Product
        product={{}}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={spy}
        match={match}
      />
    );
    expect(spy.called).to.be.equal(false);
    wrapper.unmount();
    expect(spy.calledOnce).to.be.equal(true);
  });

  it('cartClick invokes addToCart', () => {
    const spy = sinon.spy();
    expect(spy.called).to.equal(false);
    const wrapper = shallow(
      <Product
        product={bun}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={spy}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(spy.called).to.equal(false);
    const instance = wrapper.instance();
    instance.cartClick();
    expect(spy.calledOnce).to.equal(true);
    const addProd = {
      productId: bun.id,
      quantity: 1
    };
    expect(spy.calledWithExactly(cart.id, addProd)).to.equal(true);
  });

  it('cartClick sets state showModalCart to true', () => {
    const wrapper = shallow(
      <Product
        product={bun}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(wrapper.state('showModalCart')).to.equal(false);
    const instance = wrapper.instance();
    instance.cartClick();
    expect(wrapper.state('showModalCart')).to.equal(true);
  });

  it('handleChange updates state.quantity with new quantity', () => {
    const wrapper = shallow(
      <Product
        product={bun}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(wrapper.state('quantity')).to.equal(1);
    const event = { target: { value: 5 }};
    const instance = wrapper.instance();
    instance.handleChange(event);
    expect(wrapper.state('quantity')).to.equal(5);
  });
  it('If there is no valid product, nothing is rendered', () => {
    const wrapper = shallow(
      <Product
        product={{}}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(wrapper.find('div')).to.have.length(0);
    expect(wrapper.find('.prod-description')).to.have.length(0);
    expect(wrapper.find(QuantityMenu)).to.have.length(0);
  });

  it('If there is a valid product, component is rendered', () => {
    const wrapper = shallow(
      <Product
        product={bun}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={placeholder}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(wrapper.find('.prod-description')).to.have.length(1);
    expect(wrapper.find('.prod-details')).to.have.length(1);
    expect(wrapper.find('.title').text()).to.have.string(bun.name);
    expect(wrapper.find(QuantityMenu)).to.have.length(1);
  });

  it('When cart-btn is clicked, this.cartClick is invoked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Product
        product={bun}
        cart={cart}
        fetchProductInfo={placeholder}
        addToCart={spy}
        clearProduct={placeholder}
        match={match}
      />
    );
    expect(wrapper.state('showModalCart')).to.equal(false);
    expect(spy.called).to.equal(false);
    wrapper.find('.cart-btn').simulate('click');
    expect(wrapper.state('showModalCart')).to.equal(true);
    expect(spy.calledOnce).to.equal(true);
  });
});
