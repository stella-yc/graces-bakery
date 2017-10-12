import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductIcon = (props) => {
  let {id, name, price, image} = props.prod;
  return (
    <div className="product-icon">
      <Link to={`/products/${id}`}>
        <div
          className="img-container"
          style={{ backgroundImage: `url(${image})`}} />
      </Link>
      <h3>{name}</h3>
      <p>{`$${price}`}</p>
    </div>
  );
};

export default ProductIcon;
