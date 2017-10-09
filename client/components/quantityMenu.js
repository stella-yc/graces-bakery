import React from 'react';

const QuantityMenu = (props) => {
  let { quantity } = props;
  quantity = +quantity;
  const values = [];
  for (let i = 1; i <= quantity; i++) {
    values.push(i);
  }
  const options = values.map(val =>
    <option key={val} value={val}>{val}</option>
  );
  return (
    <form >
    <div className="form-element">
      <label htmlFor="quantity">Quantity</label>
      <select
        name="quantity"
      >
      { options }
      </select>
    </div>
  </form>
  );
};

export default QuantityMenu;
