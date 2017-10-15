/* global describe beforeEach it */

import setup from './setup.spec.js';
import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { AuthForm } from './auth-form';
import store from '../store';
import sinon from 'sinon';
import { MemoryRouter as Router, Redirect } from 'react-router-dom';

describe('<Login /> and <Signup />', () => {

  it('AuthForm component displays Login or Signup', () => {
    let wrapper = shallow(
      <AuthForm
        name={'login'}
        displayName={'Login'}
        error={null}
        isLoggedIn={false}
        login={() => true}
      />,
      { context: { store }}
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.be.equal('Login');
    expect(wrapper.text()).to.not.contain('Sign Up');
  });

  it('Signup component displays signup, not Login', () => {
    let wrapper = shallow(
    <AuthForm
      name={'signup'}
      displayName={'Sign Up'}
      error={null}
      isLoggedIn={false}
      login={() => true}
      />,
      { context: { store }}
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.be.equal('Sign Up');
    expect(wrapper.text()).to.not.contain('Login');
  });

  it('handleChange sets controlled component state', () => {
    let wrapper = shallow(
      <AuthForm
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        login={() => true}
      />,
      { context: { store }}
    );
    let email = 'azula@rats.com';
    let password = '123';
    wrapper
      .find('#input-email')
      .simulate('change', {target: { value: email }});
    wrapper
      .find('#input-password')
      .simulate('change', {target: { value: password }});
    expect(wrapper.state().email).to.be.equal(email);
    expect(wrapper.state().password).to.be.equal(password);
  });

  it('Submitting form invokes this.props.login', () => {
    let spy = sinon.spy();
    let wrapper = shallow(
      <AuthForm
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        login={spy}
      />,
      { context: { store }}
    );
    expect(spy.notCalled).to.be.equal(true);
    let formName = 'signup';
    let email = 'azula@rats.com';
    let password = '123';
    wrapper.setState({ formName, email, password });
    wrapper.find('form').simulate('submit', { preventDefault () {} });
    expect(spy.called).to.be.equal(true);
    expect(spy.alwaysCalledWithExactly(email, password, formName)).to.be.equal(true);
  });

  it('when new props isLoggedIn is true, it updates state', () => {
    let wrapper = shallow(<AuthForm
      name={'signup'}
      displayName={'Sign Up'}
      error={null}
      isLoggedIn={true}
      login={() => true}
      />,
      { context: { store }}
    );
    expect(wrapper.state('redirectToHome')).to.equal(true);
  });

  it('when redirectToHome is true, it renders Redirect', () => {
    let wrapper = mount(
      <Router>
        <AuthForm
          name={'signup'}
          displayName={'Sign Up'}
          error={null}
          isLoggedIn={true}
          login={() => true}
        />
      </Router>,
        { context: { store }}
    );
    expect(wrapper.find(Redirect)).to.have.length(1);
  });


});
