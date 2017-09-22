import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';

/*** COMPONENT ***/
const Nav = (props) => {
  const {handleClick, isLoggedIn} = props;
  return (
    <div>
      <h1>Grace's Bakery</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
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
