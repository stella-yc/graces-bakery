import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { callGetCart } from '../store';
import { withRouter, Link } from 'react-router-dom';

const CartIcon = (props) => {
  const { id, name, image, price } = props.product;
  const { quantity } = props.product.CartDetail;
  return (
    <tr className="cart-icon">
      <td className="grid-item cart-img-container">
        <img src={image} />
      </td>
      <td className="grid-item cart-name">
        <p>{name}</p>
      </td>
      <td className="grid-item cart-price">
        <p>{`$${price}`}</p>
      </td>
      <td className="grid-item cart-quantity">
        <p>{quantity}</p>
      </td>
    </tr>
  );
};

const CartTable = (props) => {
  const { products } = props;
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
        <CartIcon key={prod.id} product={prod} />
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
      showCart: false
    };
  }
  componentDidMount () {
    if (this.props.user.id) {
      this.props.callGetCart(this.props.user.id);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.callGetCart(nextProps.user.id);
    }
    if (nextProps.cart.id !== this.props.cart.id) {
      this.setState({showCart: true});
    }
  }

  render() {
    const { cart } = this.props;
    if (!cart.products) {
      return null;
    }
    return (
      <div className="cart">
        <h1>My Cart</h1>
        <CartTable products={cart.products} />
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
