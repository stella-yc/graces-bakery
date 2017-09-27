import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './auth-form';
import Nav from './nav';
import UserHome from './user-home';

/*** COMPONENT ***/
export class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component: Component, isLoggedIn, ...rest } = this.props;
    console.log('Private-Route isLoggedIn', isLoggedIn);
    return <Route {...rest} render={props => {
      return isLoggedIn ? (
        <Component {...props} />
      ) : <Redirect to="/login" />;
    }} />
  }
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  };
}

export default withRouter(connect(mapState, {})(PrivateRoute));

/*** PROP TYPES ***/
PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
