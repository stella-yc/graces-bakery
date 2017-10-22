/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';

import { CartIcon } from './cart-icon';
import store from '../store';
import QuantityMenu from './quantityMenu';

describe('<CartIcon />', () => {
  let wrapper;

  const dummyCart = {
    id: 1
  };
  const dummyProd = {
    id: 2,
    name: 'Pineapple Shortcake',
    image: '/img/pineappleCake.jpg',
    price: '20.00',
    CartDetail: {
      quantity: 3
    }
  };
  let removeSpy;
  let updateQspy;
  beforeEach(() => {
    removeSpy = sinon.spy();
    updateQspy = sinon.spy();

    wrapper = shallow(
      <CartIcon
      cart={dummyCart}
      updateProductQ={updateQspy}
      removeFromCart={removeSpy}
      product={dummyProd}
    />
    );
  });

  it('renders the product information', () => {
    expect(wrapper.text()).to.have.string('20.00');
    expect(wrapper.text()).to.not.have.string('19.95');
  });

  it('renders the QuantityMenu Component', () => {
    expect(wrapper.find(QuantityMenu)).to.have.length(1);
  });

  it('updateQuantity invokes updateProductQ thunk action creator', () => {
    expect(updateQspy.called).to.be.equal(false);
    const instance = wrapper.instance();
    let event = {target: { value: 5 }};
    instance.updateQuantity(event);
    expect(updateQspy.called).to.be.equal(true);
    expect(updateQspy.calledWith(dummyCart.id)).to.equal(true);
    expect(updateQspy.args[0][1].quantity).to.equal(event.target.value);
    expect(updateQspy.args[0][1].productId).to.equal(dummyProd.id);
  });

  it('updateQuantity updates state with the new quantity', () => {
    expect(updateQspy.called).to.be.equal(false);
    const instance = wrapper.instance();
    const event = {target: { value: 5 }};
    instance.updateQuantity(event);
    expect(wrapper.state('quantity')).to.be.equal(5);
  });

  it('when remove-product-btn is clicked, removeFromCart is invoked', () => {
    expect(removeSpy.called).to.be.equal(false);
    wrapper.find('.remove-product-btn').simulate('click');
    expect(removeSpy.called).to.be.equal(true);
    expect(removeSpy.calledWith(dummyCart.id)).to.equal(true);
    expect(removeSpy.args[0][1].productId).to.equal(dummyProd.id);
    expect(removeSpy.args[0][1].productId).to.not.equal(5);
  });

});
