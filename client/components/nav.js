import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';

import { logout, removeCart } from '../store';

/*** SUB-COMPONENT ***/
const NavLoggedIn = (props) => {
  const { handleLogout } = props;
  return (
    <div className="account-info">
      <NavLink to="/dashboard">Account</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <Link
        id="logout-link"
        to="/home"
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
};

/*** SUB-COMPONENT ***/
const NavLoggedOut = () => {
  return (
    <div className="account-info">
      <NavLink to="/cart">Cart</NavLink>
      <NavLink
        className="account1"
        to="/login">
        Login
      </NavLink>
      <span className="divider">/</span>
      <NavLink
        className="account2"
        to="/signup">
        Sign Up
      </NavLink>
    </div>
  );
};

/*** COMPONENT ***/
export const Nav = (props) => {
  const { handleLogout, isLoggedIn } = props;
  const generateNavLinks = (loggedIn) => {
    if (loggedIn) {
      return (<NavLoggedIn handleLogout={handleLogout} />);
    } else {
      return (<NavLoggedOut />);
    }
  };

  return (
    <div className="header">
      <Link to="/home"><h1 className="logo">Grace's Bakery</h1></Link>
      <nav>
        <NavLink to="/category/all">Shop</NavLink>
        { generateNavLinks(isLoggedIn) }
      </nav>
    </div>
  );
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout () {
      dispatch(logout());
      dispatch(removeCart());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Nav));

/*** PROP TYPES ***/
Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
