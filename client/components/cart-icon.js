import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendUpdatedCart, removeProduct } from '../store';
import QuantityMenu from './quantityMenu';

/*** COMPONENT ***/
export class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.product.CartDetail.quantity
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  updateQuantity (event) {
    const { cart, product, updateProductQ } = this.props;
    const newQuantity = +event.target.value;
    const prodInfo = {
      quantity: newQuantity,
      productId: product.id
    };
    this.setState({quantity: newQuantity});
    updateProductQ(cart.id, prodInfo);
  }

  handleRemove () {
    const { cart, product, removeFromCart } = this.props;
    removeFromCart(cart.id, { productId: product.id });
  }

  render () {
    const { id, name, image, price } = this.props.product;
    return (
      <tr className="cart-icon">
        <td className="grid-item cart-img-container">
          <Link to={`/products/${id}`}>
            <img src={image} />
          </Link>
        </td>
        <td className="grid-item cart-name">
          <Link to={`/products/${id}`}>
            <p>{name}</p>
          </Link>
        </td>
        <td className="grid-item cart-price">
          <p>{`$${price}`}</p>
        </td>
        <td className="grid-item cart-quantity">
          <QuantityMenu
            quantity={30}
            selected={this.state.quantity}
            handleChange={this.updateQuantity}
          />
        </td>
        <td className="grid-item">
          <button
            className="remove-product-btn"
            onClick={this.handleRemove}
            >
            X
          </button>
        </td>
      </tr>
    );
  }
}

/*** CONTAINER ***/
const mapState = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    updateProductQ: (cartId, prodInfo) =>
      dispatch(sendUpdatedCart(cartId, prodInfo)),
    removeFromCart: (cartId, prodId) =>
      dispatch(removeProduct(cartId, prodId))
  };
};

export default connect(mapState, mapDispatch)(CartIcon);

/*** PROP TYPES ***/
CartIcon.propTypes = {
  cart: PropTypes.object.isRequired,
  updateProductQ: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

