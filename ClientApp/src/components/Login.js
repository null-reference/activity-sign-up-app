import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

const initialFormData = {
  username: "",
  password: "",
};

// TODO: currently does not display errors when login fails

/**
 * Simple login component.
 */
export class Login extends Component {
  displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      formData: {
        ...initialFormData
      }
    };
    this.formValueChanged = this.formValueChanged.bind(this);
    this.login = this.login.bind(this);
  }

  formValueChanged(event) {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });
  }

  login() {
    const {
      username,
      password,
    } = this.state.formData;

    this.props.onLogin({ username, password });
  }

  render () {
    const {
      loggingIn,
    } = this.props;

    const {
      username,
      password,
    } = this.state.formData;

    return (
      <div>
        {this.props.isAuthenticated && <Redirect to="/" />}
        
        <h1>Login</h1>

        <TextInputField
          name="username"
          value={username}
          label="Username"
          onChange={this.formValueChanged}
          disabled={loggingIn}
        />
        <TextInputField
          name="password"
          value={password}
          label="Password"
          onChange={this.formValueChanged}
          disabled={loggingIn}
        />
        
        <Button className="submit-button" onClick={this.login}>
          {loggingIn ? "Logging in..." : "Login"}
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

const TextInputField = ({ name, value, label, onChange, disabled }) => (
  <div>
    <label htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);
