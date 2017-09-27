/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from './private-route';
import store from '../store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('<PrivateRoute />', () => {

it('returns a Route', () => {
  let wrapper = shallow(
      <PrivateRoute />,
    { context: { store }}
  );
  expect(wrapper.find(Route)).to.have.length(1);
});

});
