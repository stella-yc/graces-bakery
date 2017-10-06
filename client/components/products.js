import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categoryProducts } from '../store';
import { withRouter } from 'react-router-dom';

const ProductIcon = (props) => {
  let {id, name, description, price, image} = props.prod;
  return (
    <div className="product-icon">
      <div className="img-container"><img src={image} /></div>
      <h4>{name}</h4>
      <p>{`$${price}`}</p>
    </div>
  );
};
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
    console.log('***', categories);
    return (
      <div>
        <h3>{this.props.match.params.cid}</h3>
        {
          categories.products && categories.products.map(prod => {
            return <ProductIcon key={prod.id} prod={prod} />;
          })
        }
      </div>
    );
  }
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    categories: state.categories
  };
};

export default withRouter(connect(mapState, {categoryProducts})(Products));

/*** PROP TYPES ***/
Products.propTypes = {
  products: PropTypes.array,
};
