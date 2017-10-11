import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { callGetCart } from '../store';
import { withRouter, Link } from 'react-router-dom';
import ProductIcon from './product-icon';

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
    if (!cart) {
      return null;
    }
    return (
      <div>
        <div className="cat-description">
          <h1>Cart</h1>
          <p>{cart.id}</p>
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
