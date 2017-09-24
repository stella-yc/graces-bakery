import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/*** COMPONENT ***/
export const Home = (props) => {

  return (
    <div>
      <h3>Home</h3>
    </div>
  );
};

/*** CONTAINER ***/
const mapState = (state) => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(Home);

/*** PROP TYPES ***/
// Home.propTypes = {
//   email: PropTypes.string
// };
