/* global describe beforeEach it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import QuantityMenu, { generateOptions } from './quantityMenu';

describe('QuantityMenu Component', () => {
  let wrapper, spy;
  const quantity = 5;
  const selected = 3;

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = shallow(
      <QuantityMenu
        quantity={quantity}
        selected={selected}
        handleChange={spy}
      />
    );
  });

  it('renders a select menu with options', () => {
    expect(wrapper.find('select')).to.have.length(1);
    const select = (
      <select name="quantity" value={selected} onChange={spy}>
        {generateOptions(quantity)}
      </select>
    );
    expect(wrapper.contains(select)).to.equal(true);
  });

  it('renders the correct options for the select menu', () => {
    expect(wrapper.find('option')).to.have.length(quantity);
    const opt = <option key={5} value={5}>{5}</option>;
    const invalidOpt = <option key={6} value={6}>{6}</option>;
    const zeroOpt = <option key={0} value={0}>{0}</option>
    expect(wrapper.contains(opt)).to.be.equal(true);
    expect(wrapper.contains(invalidOpt)).to.be.equal(false);
    expect(wrapper.contains(zeroOpt)).to.be.equal(false);
  });

  it('onChange of the select, handleChange is invoked', () => {
    expect(spy.called).to.equal(false);
    const event = {target: {value: 5 }};
    wrapper.find('select').simulate('change', event);
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0].target.value).to.equal(event.target.value);
  });

});
