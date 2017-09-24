/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './home';

describe('<Home />', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('renders "Home" in h3', () => {
    expect(home.find('h3').text()).to.be.equal('Home');
  });
});
