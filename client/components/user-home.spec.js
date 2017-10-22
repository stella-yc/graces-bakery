/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { UserHome } from './user-home';

describe('<UserHome />', () => {
  let userHome;
  const dummyUser = {
    firstName: 'Spongebob',
    lastName: 'Squarepants',
    email: 'bikini@bottom.com'
  };
  let logoutSpy = sinon.spy();

  beforeEach(() => {
    userHome = shallow(
      <UserHome
        user={dummyUser}
        handleLogout={logoutSpy}
      />
    );
  });

  it('renders the user information', () => {
    expect(userHome.text()).to.have.string('Spongebob');
    expect(userHome.text()).to.have.string('Squarepants');
    expect(userHome.text()).to.have.string('bikini@bottom.com');
  });

  it('clicking logout will invoke handleLogout', () => {
    userHome.find('.logout-btn').simulate('click');
    expect(logoutSpy.called).to.be.equal(true);
  });
});
