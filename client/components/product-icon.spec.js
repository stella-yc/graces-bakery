/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import ProductIcon from './product-icon';
import store from '../store';

describe('ProductIcon Component', () => {
  const bun = {
    id: 1,
    name: 'Curry Bun',
    description: 'Yummy',
    image: '/img/cookies.jpg',
    price: '9.99'
  };

  it('renders a given product', () => {
    const wrapper = mount(
        <Router>
          <ProductIcon
            prod={bun}
          />
        </Router>
      );
    expect(wrapper.find('.product-icon')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.have.string(bun.name);
    expect(wrapper.find('p').text()).to.have.string(bun.price);
    expect(wrapper
      .contains(
        <div
          className="img-container"
          style={{backgroundImage: `url(${bun.image})`}}
        />))
      .to.be.equal(true);
  });

});
