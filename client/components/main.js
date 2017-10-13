import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './auth-form';
import Signup from './signup';
import Nav from './nav';
import UserHome from './user-home';
import Home from './home';
import Products from './products';
import Product from './product';
import Categories from './categories';
import Cart from './cart';
import PrivateRoute from './private-route';
import Checkout from './checkout';
import { me, callGetCart } from '../store';


/*** COMPONENT ***/
export class Main extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const { isLoggedIn } = this.props;
    return (
      <div className="main">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/category/all" component={Categories} />
          <Route path="/category/:cid" component={Products} />
          <Route path="/products/:pid" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <PrivateRoute path="/dashboard" component={UserHome} />
        </Switch>
      </div>
    );
  }
}

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    // state.user.id -> undefined
    // !state.user.id -> true
    // !!state.user.id -> false
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(callGetCart());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));

/*** PROP TYPES ***/
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

