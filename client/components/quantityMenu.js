import React from 'react';

const QuantityMenu = (props) => {
  let { quantity, selected, handleChange } = props;
  quantity = +quantity;
  selected = +selected;
  const values = [];
  for (let i = 1; i <= quantity; i++) {
    values.push(i);
  }
  const options = values.map(val => {
    return (<option key={val} value={val}>{val}</option>);
  }

  );
  return (
    <form >
    <div className="form-element">
      <select
        name="quantity"
        value={selected}
        onChange={handleChange}
      >
      { options }
      </select>
    </div>
  </form>
  );
};

export default QuantityMenu;
