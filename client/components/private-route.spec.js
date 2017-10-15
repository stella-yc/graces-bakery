/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { PrivateRoute } from './private-route';
import store from '../store';
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom';

describe('<PrivateRoute />', () => {

it('returns a Route', () => {
  let wrapper = shallow(
      <PrivateRoute
        isLoggedIn={false}
      />,
    { context: { store }}
  );
  expect(wrapper.find(Route)).to.have.length(1);
});

it('renders a component if logged in', () => {
  let comp = () => {
    return (
      <h1>Hello</h1>
    );
  };
  let wrapper = mount(
    <Router>
      <PrivateRoute
        isLoggedIn={true}
        component={comp}
      />
    </Router>,
    { context: { store }}
  );
  expect(wrapper.find(comp)).to.have.length(1);
  expect(wrapper.find('h1')).to.have.length(1);
  expect(wrapper.find('h1').text()).to.equal('Hello');
});

it('renders a Redirect if not logged in', () => {
  let comp = () => {
    return (
      <h1>Hello</h1>
    );
  };
  let wrapper = mount(
    <Router>
      <PrivateRoute
        isLoggedIn={false}
        component={comp}
      />
    </Router>,
    { context: { store }}
  );
  expect(wrapper.find(comp)).to.have.length(0);
  expect(wrapper.find(Redirect)).to.have.length(1);
});
});
