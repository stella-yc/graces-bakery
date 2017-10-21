/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Cart } from './cart';
import CartTable from './cart-table';
import store from '../store';

describe('<Cart />', () => {
  const dummyCart =
  {
    id: 10,
    products:
    [
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
        price: '25.994',
        CartDetail: {
          quantity: 1
        }
      }
    ]
  };

  const dummyUser = {
    id: 1,
    firstName: 'Squidward',
    lastName: 'Tentacles'
  };

  it('on componentDidMount, fetchCartInfo is invoked', () => {
    const fetchCartSpy = sinon.spy();
    expect(fetchCartSpy.called).to.be.equal(false);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Cart
            user={dummyUser}
            cart={dummyCart}
            fetchCartInfo={fetchCartSpy}
          />
        </Router>
      </Provider>,
        {context: { store }}
      );
    expect(fetchCartSpy.calledOnce).to.be.equal(true);
  });

  it('if cartId is unavailable, calculateSubTotal is not invoked', () => {
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={{}}
        fetchCartInfo={() => true}
      />
    );
    const instance = wrapper.instance();
    instance.calculateSubTotal = sinon.spy(instance.calculateSubTotal);
    expect(instance.calculateSubTotal.called).to.be.equal(false);
    wrapper.update();
    expect(instance.calculateSubTotal.called).to.be.equal(false);
    expect(wrapper.state('subTotal')).to.be.equal('0.00');
  });

  it('on componentWillReceiveProps, if user.id changes, fetchCartInfo is invoked', () => {
    const fetchCartSpy = sinon.spy();
    expect(fetchCartSpy.called).to.be.equal(false);
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={{}}
        fetchCartInfo={fetchCartSpy}
      />
    );
    const newUser = {
      id: 2,
      firstName: 'Patrick',
      lastName: 'Star'
    };
    wrapper.setProps({user: newUser});
    expect(fetchCartSpy.calledOnce).to.be.equal(true);
    expect(fetchCartSpy.calledWithExactly(newUser.id)).to.be.equal(true);
    expect(fetchCartSpy.calledWith(9000)).to.be.equal(false);

  });

  it('on componentWillReceiveProps, if nextProps has a cart.id, calculateSubTotal', () => {
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={{}}
        fetchCartInfo={() => true}
      />
    );
    const instance = wrapper.instance();
    instance.calculateSubTotal = sinon.spy(instance.calculateSubTotal);
    expect(instance.calculateSubTotal.called).to.be.equal(false);
    wrapper.setProps({cart: dummyCart});
    expect(instance.calculateSubTotal.calledOnce).to.be.equal(true);
    expect(instance.calculateSubTotal.args[0][0].id).to.be.equal(dummyCart.id);
    expect(instance.calculateSubTotal.args[0][0].products).to.be.equal(dummyCart.products);
  });

  it('on componentWillReceiveProps, if nextProps has a different cart.id, calculateSubTotal', () => {
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={dummyCart}
        fetchCartInfo={() => true}
      />
    );
    const instance = wrapper.instance();
    instance.calculateSubTotal = sinon.spy(instance.calculateSubTotal);
    expect(instance.calculateSubTotal.called).to.be.equal(false);

    const newCart = {
      id: 5,
      products: []
    };

    wrapper.setProps({cart: newCart});
    expect(instance.calculateSubTotal.calledOnce).to.be.equal(true);
    expect(instance.calculateSubTotal.args[0][0].id).to.be.equal(newCart.id);
    expect(instance.calculateSubTotal.args[0][0].products).to.be.equal(newCart.products);
  });

  it('calculateSubTotal sets subTotal state to 0.00 if there are no products', () => {
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={{}}
        fetchCartInfo={() => true}
      />
    );
    const instance = wrapper.instance();
    instance.calculateSubTotal({});
    expect(wrapper.state('subTotal')).to.equal('0.00');
  });

  it('calculateSubTotal calculates subTotal correctly, to 2 decimal places', () => {
    const wrapper = shallow(
      <Cart
        user={dummyUser}
        cart={{}}
        fetchCartInfo={() => true}
      />
    );
    const instance = wrapper.instance();
    instance.calculateSubTotal(dummyCart);
    expect(wrapper.state('subTotal')).to.equal('85.99');
    expect(wrapper.state('subTotal')).to.not.equal(85.994);
  });

  it('renders CartTable component', () => {
    let wrapper = mount(
      <Provider store={store}>
        <Router>
          <Cart
            user={dummyUser}
            cart={{}}
            fetchCartInfo={() => true }
          />
        </Router>
      </Provider>,
        {context: { store }}
    );
    expect(wrapper.find(CartTable)).to.have.length(1);
  });

});
