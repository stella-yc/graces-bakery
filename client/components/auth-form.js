import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import { withRouter, Redirect } from 'react-router-dom';

/*** COMPONENT***/
class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false
    };
    this.submitAuth = this.submitAuth.bind(this);
  }

  submitAuth(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    this.props.auth(email, password, formName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({redirectToHome: true});
    }
  }

  render () {
    const {name, displayName, error, isLoggedIn} = this.props;
    if (this.state.redirectToHome) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <form onSubmit={this.submitAuth} name={name}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

/*** CONTAINER ***/

// Note that we have two different sets of 'mapStateToProps' functions -
// one for Login, and one for Signup. However, they share the same
// 'mapDispatchToProps' function, and share the same Component.
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  };
};

export const Login = withRouter(connect(mapLogin, {auth})(AuthForm));
export const Signup = withRouter(connect(mapSignup, {auth})(AuthForm));

/*** PROP TYPES ***/
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  auth: PropTypes.func.isRequired
};
