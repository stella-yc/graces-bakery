import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { categoryProducts, clearProducts } from '../store';
import ProductIcon from './product-icon';

/*** COMPONENT ***/
export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProducts: false
    };
  }

  componentDidMount () {
    this.props.fetchProducts(this.props.match.params.cid);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.cid !== this.props.match.params.cid) {
      this.props.fetchProducts(nextProps.match.params.cid);
    }
    if (nextProps.products) {
      this.setState({showProducts: true});
    }
  }

  componentWillUnmount () {
    this.props.clearProductsStore();
  }

  render() {
    const { category, products } = this.props;
    if (!products) {
      return null;
    }
    return (
      <div>
        <div className="cat-description">
          <h1>{category.displayName}</h1>
          <p>{category.description}</p>
        </div>
        <div className="prod-container">
        {
          products.map(prod =>
            <ProductIcon key={prod.id} prod={prod} />
          )
        }
        </div>
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    category: {
      name: state.productsByCat.name,
      displayName: state.productsByCat.displayName,
      description: state.productsByCat.description,
      id: state.productsByCat.id
    },
    products: state.productsByCat.products
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts (cid) {
      dispatch(categoryProducts(cid));
    },
    clearProductsStore () {
      dispatch(clearProducts());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Products));

/*** PROP TYPES ***/
Products.propTypes = {
  category: PropTypes.object.isRequired,
  products: PropTypes.array,
  fetchProducts: PropTypes.func.isRequired,
  clearProductsStore: PropTypes.func.isRequired
};
