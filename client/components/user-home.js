import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, removeCart } from '../store';

/*** COMPONENT ***/
export const UserHome = (props) => {
  const { email, firstName, lastName, id, isAdmin } = props.user;
  const { handleClick } = props;
  return (
    <div className="profile">
      <table className="profile-table">
        <thead>
          <tr>
            <td className="profile-title">Profile</td>
          </tr>
        </thead>
        <tbody>
          <tr className="profile-row">
            <td className="profile-label">First Name:</td>
            <td className="profile-data">{firstName}</td>
          </tr>
          <tr className="profile-row">
            <td className="profile-label">Last Name:</td>
            <td className="profile-data">{lastName}</td>
          </tr>
          <tr className="profile-row">
            <td className="profile-label">Email:</td>
            <td className="profile-data">{email}</td>
          </tr>
        </tbody>
      </table>
      <div className="profile-section">
        <Link to="/cart"><button className="btn-primary cart-btn">View Cart</button></Link>
        <button className="btn-red logout-btn" onClick={handleClick}>Logout</button>
      </div>

    </div>
  );
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout());
      dispatch(removeCart());
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/*** PROP TYPES ***/
UserHome.propTypes = {
  user: PropTypes.object
};
