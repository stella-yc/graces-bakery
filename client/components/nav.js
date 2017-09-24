import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { logout } from '../store';

/*** COMPONENT ***/
const Nav = (props) => {
  const {handleClick, isLoggedIn} = props;
  return (
    <div className="header">
    <Link to="/home"><h1 className="logo">Grace's Bakery</h1></Link>
      <nav>
        <NavLink to="/home">New</NavLink>
        <NavLink to="/home">Bread</NavLink>
        <NavLink to="/home">Pastry</NavLink>
        <NavLink to="/home">Cakes</NavLink>
        {
          isLoggedIn
            ? <div className="account-info">
              {/* The navbar will show these NavLinks after you log in */}
              <NavLink
                to="/home">
                My Account
              </NavLink>
              <a
                href="#"
                onClick={handleClick}>
                Logout
              </a>
            </div>
            : <div className="account-info">
              {/* The navbar will show these NavLinks before you log in */}
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
        }
      </nav>
      <hr />
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
    handleClick () {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Nav));

/*** PROP TYPES ***/
Nav.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
