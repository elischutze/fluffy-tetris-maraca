import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, USER_AUTH_COOKIE } from '../utils/variables';
import { setCookie } from '../utils/storage';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: '',
      password: '',
      loginSubmitted: false,
    };
  }

  submitLogin(event) {
    event.preventDefault();
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then(async res => {
      const result = await res.json();
      console.log('2', result);
      fetch(`${API_URL}`, {
        headers: { Authorization: result.accessToken },
      }).then(async res => {
        const result = await res.json();
        console.log('2', result);
        if (res.ok && result.token) {
          console.log(res.ok, 'setting cookie');
          setCookie(USER_AUTH_COOKIE, result.token.email, {
            expiry: result.token.exp,
          });
          this.props.history.replace('/');
        }
      });
    });
    console.log(this.state);
  }

  handleInputChange(evt, field) {
    this.setState({ [field]: evt.currentTarget.value });
  }
  render() {
    return (
      <form onSubmit={this.submitLogin} className="login">
        <fieldset>
          <label htmlFor="login-email">Email:</label>
          <input
            type="text"
            placeholder="Enter your email address"
            id="login-email"
            onChange={evt => {
              this.handleInputChange(evt, 'email');
            }}
          />
          <label htmlFor="login-passphrase">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="login-passphrase"
            onChange={evt => {
              this.handleInputChange(evt, 'password');
            }}
          />
          <input type="submit" value="Login" />
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Login);
