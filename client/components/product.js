import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { singleProduct, addProductToCart } from '../store';
import QuantityMenu from './quantityMenu';
import Modal from './modal';

/*** COMPONENT ***/
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProducts: false,
      showModal: false,
      quantity: 1
    };
    this.cartClick = this.cartClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.pid);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    console.log('match', this.props.match.params.pid);
    if (nextProps.match.params.pid !== this.props.match.params.pid) {
      this.props.singleProduct(nextProps.match.params.pid);
    }
    if (nextProps.product.id) {
      this.setState({ showProducts: true });
    }
  }

  cartClick() {
    console.log('button clicked');
    const { isLoggedIn, user, product } = this.props;
    if (!isLoggedIn) {
      this.setState({showModal: true});
    } else {
      const addProd = {
        productId: product.id,
        quantity: +this.state.quantity
      };
      this.props.addProductToCart(user.id, addProd);
    }
  }

  handleChange(event) {
    const quantity = event.target.value;
    this.setState({
      quantity: quantity
    });
  }

  render() {
    const { product } = this.props;
    if (!product.id) {
      return null;
    }
    return (
      <div className="prod-description">
        <div className="img-container">
          <img src={product.image} />
        </div>
        <div className="prod-details">
          <h2 className="title">{product.name}</h2>
          <h4 className="price">{`$${product.price}`}</h4>
          <p className="description">{product.description}</p>
          <div>
            <p>Quantity</p>
            <QuantityMenu
              quantity={30}
              handleChange={this.handleChange}
            />
            <button className="cart-btn" onClick={this.cartClick}>Add to Cart</button>
          </div>
        </div>
        <Modal
          open={this.state.showModal}
          content="You must be logged in before adding to cart."
          closeModal={() => this.setState({showModal: false})}
        />
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    user: state.user,
    product: state.products.product,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  };
};

export default withRouter(connect(mapState, { singleProduct, addProductToCart })(Product));

/*** PROP TYPES ***/
Product.propTypes = {
  product: PropTypes.object,
};
