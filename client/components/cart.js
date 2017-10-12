import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { callGetCart } from '../store';
import { withRouter, Link } from 'react-router-dom';

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
      products && products.map(prod => (
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

/*** COMPONENT ***/

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      subTotal: 0
    };
    this.calculateSubTotal = this.calculateSubTotal.bind(this);
  }

  componentDidMount () {
    if (this.props.user.id) {
      this.props.callGetCart();
    }
    if (this.props.cart.id) {
      this.calculateSubTotal(this.props.cart);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.callGetCart(nextProps.user.id);
    }
    if (nextProps.cart.id) {
      this.calculateSubTotal(nextProps.cart);
    }
    if (nextProps.cart.id !== this.props.cart.id) {
      this.calculateSubTotal(nextProps.cart);
      this.setState({showCart: true});
    }
  }

  calculateSubTotal (cart) {
    console.log('calculateSubTotal called');
    if (!cart.products) {
      return this.setState({ subTotal: 0 });
    }
    let subTotal = cart.products.reduce((acc, prod) => {
      let sum = prod.price * prod.CartDetail.quantity;
      return acc + sum;
    }, 0);
    subTotal = parseFloat(Math.round(subTotal * 100) / 100).toFixed(2);
    this.setState({ subTotal: subTotal });
  }

  render() {
    const { cart } = this.props;

    return (
      <div className="cart-container">
        <div className="cart">
          <h1>My Cart</h1>
          <CartTable
            products={cart.products}
          />
          <div>
            <h4 className="cart-subtotal">
              <b>SubTotal:</b> ${this.state.subTotal}
            </h4>
            <Link to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    categories: state.productsByCat,
    user: state.user,
    cart: state.cart
  };
};

export default withRouter(connect(mapState, { callGetCart })(Cart));

/*** PROP TYPES ***/
Cart.propTypes = {

};
