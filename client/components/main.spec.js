/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './main';
import store from '../store';
import sinon from 'sinon';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('<Main />', () => {

// Testing Nav and PrivateRoutes is tricky since
// * Must wrap in Router
// * They are returned wrapped in a withRouter and connect,
// ** which is tricky to render

  it('renders Route components', () => {
    let wrapper = shallow(
        <Main />,
      { context: { store }}
    );
    expect(wrapper.find(Route)).to.have.length(3);
  });

  it('invokes this.props.loadInitialData', () => {
    let spy = sinon.spy();
    let wrapper = shallow(
        <Main
        loadInitialData={spy}
        />,
      { context: { store },
        lifecycleExperimental: true
      });
    expect(spy.called).to.be.equal(true);
  });

});
