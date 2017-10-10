import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categoryProducts } from '../store';
import { withRouter, Link } from 'react-router-dom';
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
    this.props.categoryProducts(this.props.match.params.cid);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    console.log('match', this.props.match.params.cid);
    if (nextProps.match.params.cid !== this.props.match.params.cid) {
      this.props.categoryProducts(nextProps.match.params.cid);
    }
    if (nextProps.categories.products) {
      this.setState({showProducts: true});
    }
  }
  render() {
    const { categories } = this.props;

    if (!categories.products) {
      return null;
    }
    return (
      <div>
        <div className="cat-description">
          <h1>{categories.displayName}</h1>
          <p>{categories.description}</p>
        </div>
        <div className="prod-container">

        {
          categories.products.map(prod => {
            return <ProductIcon key={prod.id} prod={prod} />;
          })
        }
        </div>
      </div>
    );
  }
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    categories: state.productsByCat
  };
};

export default withRouter(connect(mapState, {categoryProducts})(Products));

/*** PROP TYPES ***/
Products.propTypes = {
  products: PropTypes.array,
};
