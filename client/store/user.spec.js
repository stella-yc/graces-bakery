/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import reducer, {me, logout, auth} from './user';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('User thunk creators', () => {
  let store;

  const initialState = {user: {}};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = {email: 'Cody'};
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
      return store.dispatch(me())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_USER');
          expect(actions[0].user).to.be.deep.equal(fakeUser);
        });
    });
  });

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204);
      return store.dispatch(logout())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_USER');
          expect(history.location.pathname).to.be.equal('/');
        });
    });
  });
});

describe('User - Reducer', () => {
  const defaultUser = {};
  const user = {name: 'Spongebob'};
  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(defaultUser);
  });
  it('should handle GET_USER', () => {
    expect(reducer(undefined, {type: 'GET_USER', user})).to.deep.equal(user);
  });
  it('should handle REMOVE_USER', () => {
    expect(reducer({name: 'Spongebob'}, {type: 'REMOVE_USER'})).to.deep.equal(defaultUser);
  });
});
