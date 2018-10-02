import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.styles.css';
import AppDirectory from './components/Apps/AppDirectory';
import Login from './components/Login/Login';
import { logo } from './utils/helpers';
import { isLoggedIn } from './utils/storageUtils';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Link to="/" className="logo">
            {logo}
          </Link>
        </header>
        <div className="app-container">
          <Switch>
            <Redirect exact from="/" to="/apps" />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/apps" component={AppDirectory} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export const ProtectedRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props =>
      isLoggedIn() ? (
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
