/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Checkout from './checkout';

describe('Checkout Component', () => {

  it('renders checkout message and image', () => {
    const wrapper = shallow(
      <Checkout />
    );
    expect(wrapper.find('.checkout')).to.have.length(1);
    expect(wrapper.contains(<img src="img/thanks.jpg" />)).to.be.equal(true);
  });

});
