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
      showModalCart: false,
      quantity: 1
    };
    this.cartClick = this.cartClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchProductInfo(this.props.match.params.pid);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.pid !== this.props.match.params.pid) {
      this.props.fetchProductInfo(nextProps.match.params.pid);
    }
    if (nextProps.product.id) {
      this.setState({ showProducts: true });
    }
  }

  cartClick() {
    const { product, cart } = this.props;
      const addProd = {
        productId: product.id,
        quantity: +this.state.quantity
      };
      this.props.addToCart(cart.id, addProd);
      this.setState({showModalCart: true});
  }

  handleChange(event) {
    const quantity = event.target.value;
    this.setState({ quantity });
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
              selected={this.state.quantity}
              handleChange={this.handleChange}
            />
            <button
              className="cart-btn"
              onClick={this.cartClick}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <Modal
          open={this.state.showModalCart}
          content={<Link to="/cart">Added to Cart!</Link>}
          closeModal={() => this.setState({showModalCart: false})}
        />
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    product: state.products.product,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProductInfo (pid) {
      dispatch(singleProduct(pid));
    },
    addToCart (cid, pInfo) {
      dispatch(addProductToCart(cid, pInfo));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Product));

/*** PROP TYPES ***/
Product.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  fetchProductInfo: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};
