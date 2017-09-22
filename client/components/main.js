import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Login, Signup } from './auth-form';
import Nav from './nav';
import UserHome from './user-home';
import PrivateRoute from './private-route';
import { me } from '../store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*** COMPONENT ***/
class Main extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute isLoggedIn path="/home" component={UserHome} />
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
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
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));

/*** PROP TYPES ***/
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

