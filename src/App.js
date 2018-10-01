import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppDirectory from './components/AppDirectory';
import Login from './components/Login';
import { USER_AUTH_COOKIE, logo } from './utils/variables';
import { getCookie } from './utils/storage';

// TODO Update
export const isLoggedIn = !!getCookie(USER_AUTH_COOKIE);

class App extends Component {
  render() {
    return [
      <header>
        <div className="logo">{logo}</div>
      </header>,
      <div className="app-container">
        <Switch>
          <Redirect exact from="/" to="/apps" />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/apps" component={AppDirectory} />
        </Switch>
      </div>,
    ];
  }
}

export const ProtectedRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props =>
      isLoggedIn ? (
        <Component {...{ ...props, ...routeProps }} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: routeProps.location },
          }}
        />
      )
    }
  />
);

export default App;
