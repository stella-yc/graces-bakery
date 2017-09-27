import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allProducts } from '../store';
import { withRouter } from 'react-router-dom';

/*** COMPONENT ***/
export const Products = (props) => {
  const { products } = props;
    return (
      <div>
        <h3>Products are herrree</h3>
        {
          products && products.map(prod => {
            return <p key={prod.id}>{prod.name}</p>;
          })
        }
      </div>
    );
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    products: state.products.products
  };
};

export default withRouter(connect(mapState, {allProducts})(Products));

/*** PROP TYPES ***/
Products.propTypes = {
  products: PropTypes.array,
};
