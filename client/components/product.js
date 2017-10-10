import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { singleProduct } from '../store';
import QuantityMenu from './quantityMenu';
import Modal from './modal';

/*** COMPONENT ***/
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProducts: false,
      showModal: false
    };
    this.cartClick = this.cartClick.bind(this);
  }
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.pid);
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
    if (!this.props.isLoggedIn) {
      this.setState({showModal: true});
    }
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
            <QuantityMenu quantity={30} />
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
    product: state.products.product,
    isLoggedIn: !!state.user.id
  };
};

export default withRouter(connect(mapState, { singleProduct })(Product));

/*** PROP TYPES ***/
Product.propTypes = {
  product: PropTypes.object,
};
