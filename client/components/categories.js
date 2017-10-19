import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { allCategories } from '../store';

/*** PRESENTATIONAL SUB-COMPONENT ***/
export const Category = (props) => {
  const { name, displayName, image } = props.cat;
  return (
    <div className="category">
      <Link to={`/category/${name}`}>
        <h1 className="cat-name">{displayName}</h1>
      </Link>
      <Link to={`/category/${name}`}>
        <div
          className="cat-img"
          style={{backgroundImage: `url(${image})`}}
        />
      </Link>
    </div>
  );
};

/*** COMPONENT ***/
export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProducts: false,
      showModal: false
    };
  }
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    if (!categories[0]) {
      return null;
    }
    return (
      <div>
        <div className="cat-header">
          <h2>Our selection</h2>
          <p>Baked fresh daily</p>
        </div>
        {
          categories.map((category) =>
            <Category key={category.id} cat={category} />
          )
        }
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCategories: () =>
      dispatch(allCategories())
  };
};


export default withRouter(connect(mapState, mapDispatch)(Categories));

/*** PROP TYPES ***/
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
};
