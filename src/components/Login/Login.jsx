import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  API_URL,
  getJSON,
  postJSONOptions,
  logError,
} from '../../utils/helpers';
import { setCookie, USER_AUTH_COOKIE } from '../../utils/storageUtils';
import './Login.styles.css';

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

    const { history } = this.props;
    const { email, password } = this.state;

    fetch(`${API_URL}/login`, {
      body: JSON.stringify({
        email,
        password,
        // expiry: '2m',
      }),
      ...postJSONOptions,
    })
      .then(getJSON)
      .then(loginResult => {
        const token = loginResult.accessToken;
        fetch(`${API_URL}`, {
          headers: { Authorization: token },
        })
          .then(getJSON)
          .then(({ token }) => {
            if (token) {
              setCookie(USER_AUTH_COOKIE, token, {
                expires: token.exp,
              });
            }
            history.push('/');
            window.location.reload();
          })
          .catch(logError);
      })
      .catch(logError);
  }

  handleInputChange(evt, field) {
    this.setState({ [field]: evt.currentTarget.value });
  }

  render() {
    return (
      <Fragment>
        <h1>Log in</h1>
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
      </Fragment>
    );
  }
}

export default withRouter(Login);
