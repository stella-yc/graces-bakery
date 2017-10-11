import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendUpdatedCart, removeProduct } from '../store';
import QuantityMenu from './quantityMenu';

class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.product.CartDetail.quantity
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  updateQuantity (event) {
    let newQuantity = +event.target.value;
    this.setState({quantity: newQuantity});
    let prodInfo = {
      quantity: +newQuantity,
      productId: this.props.product.id
    };
    this.props.sendUpdatedCart(this.props.user.id, prodInfo);
  }

  handleRemove (event) {
    let prodInfo = {
      productId: this.props.product.id
    };
    this.props.removeProduct(this.props.user.id, prodInfo);
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
const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart
  };
};

export default connect(mapState, { sendUpdatedCart, removeProduct })(CartIcon);

/*** PROP TYPES ***/
CartIcon.propTypes = {

};

