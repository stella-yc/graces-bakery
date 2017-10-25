import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { signup } from '../store';

/*** COMPONENT***/
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.submitAuth = this.submitAuth.bind(this);
  }

  submitAuth(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const formName = this.props.name;
    this.props.signup(firstName, lastName, email, password, formName);
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
    const {name, displayName, error, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
        <div className="auth-form">
          <h3>{displayName}</h3>
          <form onSubmit={this.submitAuth} name={name}>
            <div className="form-element">
              <label htmlFor="firstName"><small>First Name</small></label>
              <input
                id="input-firstName"
                name="firstName"
                type="text"
                onChange={this.handleChange('firstName')}
              />
            </div>
            <div className="form-element">
              <label htmlFor="lastName"><small>Last Name</small></label>
              <input
                id="input-lastName"
                name="lastName"
                type="text"
                onChange={this.handleChange('lastName')}
              />
            </div>
            <div className="form-element">
              <label htmlFor="email"><small>Email</small></label>
              <input
                id="input-email"
                name="email"
                type="text"
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="form-element">
              <label htmlFor="password"><small>Password</small></label>
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

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  };
};

export default withRouter(connect(mapSignup, { signup })(Signup));

/*** PROP TYPES ***/
Signup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired
};
