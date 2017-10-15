/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import { Nav } from './nav';
import store from '../store';
import sinon from 'sinon';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

describe('<Nav />', () => {

it('if logged out, it renders Login/Sign Up', () => {
  let wrapper = mount(
    <Router>
      <Nav
        isLoggedIn={false}
        handleLogout={() => true}
      />
    </Router>,
    { context: { store }}
  );
  expect(wrapper.find(NavLink)).to.have.length(4);
  expect(wrapper.find('.account1')).to.have.length(1);
  expect(wrapper.find('.account2')).to.have.length(1);
  expect(wrapper.text()).to.have.string('Login');
  expect(wrapper.text()).to.have.string('Sign Up');
  expect(wrapper.text()).to.not.have.string('Account');
});


  it('if logged in, it renders My Account and Logout', () => {
    let wrapper = mount(
      <Router>
        <Nav
          isLoggedIn={true}
          handleLogout={() => true}
        />
      </Router>,
    { context: { store }}
  );
  expect(wrapper.find(NavLink)).to.have.length(3);
  expect(wrapper.text()).to.have.string('Logout');
  expect(wrapper.text()).to.have.string('Account');
  expect(wrapper.text()).to.not.have.string('Login');
  });

  it('Clicking Logout will invoke handleclick', () => {
    let spy = sinon.spy();
    let wrapper = mount(
      <Router>
        <Nav
          isLoggedIn={true}
          handleLogout={spy}
          />
      </Router>,
    { context: { store }}
  );
  wrapper.find('#logout-link').simulate('click');
  expect(spy.called).to.be.equal(true);
  });

});
