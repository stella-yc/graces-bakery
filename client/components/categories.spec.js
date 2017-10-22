/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Categories, Category } from './categories';
import store from '../store';

describe('<Categories />', () => {
  const cookies = [
    {
      id: 1,
      name: 'cookies',
      displayName: 'Cookies',
      description: 'Yummy',
      image: '/img/cookies.jpg'
    }
  ];

  it('on componenentDidMount, fetchCategories is invoked', () => {
    const spy = sinon.spy();
    expect(spy.called).to.be.equal(false);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Categories
            categories={cookies}
            fetchCategories={spy}
          />
        </Router>
      </Provider>,
        {context: { store }}
      );
    expect(spy.calledOnce).to.be.equal(true);
  });

  it('if there are no categories, it renders nothing', () => {
    const wrapper = shallow(
      <Categories
        categories={[]}
        fetchCategories={() => true}
      />
    );
    expect(wrapper.find('div')).to.have.length(0);
    expect(wrapper.find(Category)).to.have.length(0);
  });
  it('if there are categories, it renders Category component', () => {
    const wrapper = shallow(
      <Categories
        categories={cookies}
        fetchCategories={() => true}
      />
    );
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find(Category)).to.have.length(1);
  });
  it('Category component renders a given category', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Category
            cat={cookies[0]}
          />
        </Router>
      </Provider>,
        {context: { store }}
      );
    expect(wrapper.find('.category')).to.have.length(1);
    expect(wrapper.find('.cat-name')).to.have.length(1);
    expect(wrapper.find('.cat-img')).to.have.length(1);
    expect(wrapper
      .contains(
        <div
          className="cat-img"
          style={{backgroundImage: `url(${cookies[0].image})`}}
        />))
      .to.be.equal(true);
  });

});
