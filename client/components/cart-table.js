import React from 'react';
import PropTypes from 'prop-types';

import CartIcon from './cart-icon';

const CartTable = (props) => {
  const { products } = props;
  if (!products || products.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty!</h2>
        <h2>:(</h2>
      </div>
    );
  }
  return (
    <table className="cart-table">
      <thead className="cart-table-header">
      <tr>
        <th></th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
    {
      products.map(prod => (
        <CartIcon
          key={prod.id}
          product={prod}
        />
      ))
    }
    </tbody>
    </table>
  );
};

export default CartTable;

/*** PROP TYPES ***/
CartTable.propTypes = {
  products: PropTypes.array
};
