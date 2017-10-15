/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Home, Jumbotron, Descriptor, Ingredients, About } from './home';

describe('<Home />', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('renders <Jumbotron />', () => {
    expect(home.find('Jumbotron')).to.have.length(1);
  });
  it('renders <Descriptor />', () => {
    expect(home.find('Descriptor')).to.have.length(1);
  });
  it('renders <Ingredients />', () => {
    expect(home.find('Ingredients')).to.have.length(1);
  });
  it('renders <About />', () => {
    expect(home.find('About')).to.have.length(1);
  });
});
