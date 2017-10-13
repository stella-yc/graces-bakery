import React from 'react';

const generateOptions = (quantity) => {
  const values = [];
  for (let i = 1; i <= quantity; i++) {
    values.push(i);
  }
  return values.map(val => {
    return (<option key={val} value={val}>{val}</option>);
  });
};

const QuantityMenu = (props) => {
  let { quantity, selected, handleChange } = props;
  quantity = +quantity;
  selected = +selected;

  return (
    <form >
    <div className="form-element">
      <select
        name="quantity"
        value={selected}
        onChange={handleChange}
      >
        { generateOptions(quantity) }
      </select>
    </div>
  </form>
  );
};

export default QuantityMenu;
