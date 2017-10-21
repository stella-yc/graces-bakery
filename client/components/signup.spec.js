/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter as Router, Redirect } from 'react-router-dom';

import setup from './setup.spec.js';
import { Signup } from './signup';
import store from '../store';

describe('<Signup />', () => {
  const placeholder = () => true;
  const user = {
    firstName: 'Spongebob',
    lastName: 'Squarepants',
    email: 'Bikini@bottom.com',
    password: 'krabbypatty'
  };

  it('Displays Signup', () => {
    let wrapper = shallow(
      <Signup
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        signup={placeholder}
      />
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.be.equal('Sign Up');
    expect(wrapper.text()).to.not.contain('Login');
  });

  it('handleChange sets controlled component state', () => {
    let wrapper = shallow(
      <Signup
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        signup={placeholder}
      />
    );
    wrapper
      .find('#input-email')
      .simulate('change', {target: { value: user.email }});
    wrapper
      .find('#input-password')
      .simulate('change', {target: { value: user.password }});
    expect(wrapper.state('email')).to.be.equal(user.email);
    expect(wrapper.state('password')).to.be.equal(user.password);
  });

  it('Submitting form invokes this.props.signup', () => {
    let spy = sinon.spy();
    let wrapper = shallow(
      <Signup
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        signup={spy}
      />
    );
    expect(spy.notCalled).to.be.equal(true);
    let formName = 'signup';
    let { firstName, lastName, email, password } = user;
    wrapper.setState({ formName, firstName, lastName, email, password });
    wrapper.find('form').simulate('submit', { preventDefault () {} });
    expect(spy.called).to.be.equal(true);
    expect(spy.alwaysCalledWithExactly(firstName, lastName, email, password, formName)).to.be.equal(true);
  });

  it('when new props isLoggedIn is true, it updates state', () => {
    let wrapper = shallow(
      <Signup
        name={'signup'}
        displayName={'Sign Up'}
        error={null}
        isLoggedIn={false}
        signup={placeholder}
      />
    );
    expect(wrapper.state('redirectToHome')).to.equal(false);
    wrapper.setProps({isLoggedIn: true});
    expect(wrapper.state('redirectToHome')).to.equal(true);
  });

  it('when isLoggedIn is true, it renders Redirect', () => {
    let wrapper = mount(
      <Router>
        <Signup
          name={'signup'}
          displayName={'Sign Up'}
          error={null}
          isLoggedIn={true}
          signup={placeholder}
        />
      </Router>,
        { context: { store }}
    );
    expect(wrapper.find(Redirect)).to.have.length(1);
  });


});
