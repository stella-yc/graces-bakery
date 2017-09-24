/* global describe beforeEach it */

/* setup.js */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

import { expect } from 'chai';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { AuthForm } from './auth-form';
import store from '../store';
import { Redirect } from 'react-router-dom';
describe('<Login /> and <Signup />', () => {

  it('AuthForm component displays Login or Signup', () => {
    let wrapper = shallow(<AuthForm
      name={'login'}
      displayName={'Login'}
      error={null}
      isLoggedIn={false} />,
      { context: { store }}
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.be.equal('Login');
    expect(wrapper.text()).to.not.contain('Sign Up');
  });

  it('Signup component displays signup, not Login', () => {
    let wrapper = shallow(<AuthForm
      name={'signup'}
      displayName={'Sign Up'}
      error={null}
      isLoggedIn={false} />,
      { context: { store }}
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.be.equal('Sign Up');
    expect(wrapper.text()).to.not.contain('Login');
  });

  xit('dispatches auth thunk action creator on submit', () => {});

  it('when new props isLoggedIn is true, it updates state', () => {
    let wrapper = shallow(<AuthForm
      name={'signup'}
      displayName={'Sign Up'}
      error={null}
      isLoggedIn={true} />,
      { context: { store }}
    );
    expect(wrapper.state('redirectToHome')).to.equal(true);
    // expect(wrapper.contains('Redirect')).to.equal(true);
  });
  /***
   * Enzyme does NOT like react-router-v4 convention of using redirects
   * It will throw an error when I use mount(<AuthForm />) or render() since it renders Redirect outside of a Route component
   * Must use mount to test component lifecycle methods
   * shallow and checking for Redirect component does not work
    ***/
  xit('when redirectToHome is true, it renders Dashboard', () => {
    let wrapper = render(<AuthForm
      name={'signup'}
      displayName={'Sign Up'}
      error={null}
      isLoggedIn={true} />,
      { context: { store }}
    );
    expect(wrapper.find('h3').text()).to.contain('Welcome,');
    // expect(wrapper.contains('Redirect')).to.equal(true);
  });


});
