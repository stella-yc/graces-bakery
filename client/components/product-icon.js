import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductIcon = (props) => {
  let {id, name, description, price, image} = props.prod;
  return (
    <div className="product-icon">
      <div className="img-container">
        <Link to={`/products/${id}`}>
          <img src={image} />
        </Link>
      </div>
      <h3>{name}</h3>
      <p>{`$${price}`}</p>
    </div>
  );
};

export default ProductIcon;
