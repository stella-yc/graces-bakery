import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store';
import { withRouter, Redirect } from 'react-router-dom';

/*** COMPONENT***/
export class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: this.props.isLoggedIn || false,
      formName: this.props.name,
      email: '',
      password: ''
    };
    this.submitAuth = this.submitAuth.bind(this);
  }

  submitAuth(evt) {
    evt.preventDefault();
    const { formName, email, password } = this.state;
    this.props.login(email, password, formName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({redirectToHome: true});
    }
  }

  handleChange(field) {
    const updateState = (evt) => {
      const change = {};
      change[field] = evt.target.value;
      this.setState(change);
    };
    return updateState;
  }

  render () {
    const {name, displayName, error, isLoggedIn} = this.props;
    if (this.state.redirectToHome) {
      return <Redirect to="/home" />;
    }
    return (
        <div className="auth-form">
          <h3>{displayName}</h3>
          <form onSubmit={this.submitAuth} name={name}>
            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input
                id="input-email"
                name="email"
                type="text"
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="form-element">
              <label htmlFor="password">Password</label>
              <input
                id="input-password"
                name="password"
                type="password"
                onChange={this.handleChange('password')}
              />
            </div>
            <div className="form-element">
              <button
                id="submit-btn"
                className="btn-primary submit-btn"
                type="submit">{displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
    );
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

export const Login = withRouter(connect(mapLogin, { login })(AuthForm));

/*** PROP TYPES ***/
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};
