import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { callGetCart } from '../store';
import CartTable from './cart-table';


/*** COMPONENT ***/
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      subTotal: 0.00
    };
    this.calculateSubTotal = this.calculateSubTotal.bind(this);
  }

  componentDidMount () {
    const { fetchCartInfo, cart } = this.props;
    fetchCartInfo();
    if (cart.id) {
      this.calculateSubTotal(cart);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.fetchCartInfo(nextProps.user.id);
    }
    if (nextProps.cart.id || nextProps.cart.id !== this.props.cart.id) {
      this.calculateSubTotal(nextProps.cart);
      this.setState({showCart: true});
    }
  }

  calculateSubTotal (cart) {
    if (!cart.products) {
      return this.setState({ subTotal: 0.00 });
    }
    let subTotal = cart.products.reduce((acc, prod) => {
      let sum = prod.price * prod.CartDetail.quantity;
      return acc + sum;
    }, 0);
    subTotal = parseFloat(Math.round(subTotal * 100) / 100).toFixed(2);
    this.setState({ subTotal });
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
          <h4 className="cart-subtotal">
            <b>SubTotal:</b> ${this.state.subTotal}
          </h4>
          <Link to="/checkout">
            <button className="checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
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

const mapDispatch = dispatch => {
  return {
    fetchCartInfo: () =>
      dispatch(callGetCart())
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));

/*** PROP TYPES ***/
Cart.propTypes = {
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  fetchCartInfo: PropTypes.func.isRequired
};
