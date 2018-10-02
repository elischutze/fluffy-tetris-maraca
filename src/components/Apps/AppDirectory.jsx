import React, { Component, Fragment } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../App';
import AppList from './AppList';
import AppDetails from './AppDetails';
import {
  API_URL,
  authHeader,
  toDictionary,
  logError,
  getJSON,
} from '../../utils/helpers';

class AppDirectory extends Component {
  state = { apps: {}, isLoading: true };

  // TODO Abort fetches on unmount
  componentDidMount() {
    fetch(`${API_URL}/apps`, { headers: { ...authHeader } })
      .then(getJSON)
      .then(({ apps }) => {
        this.setState({
          apps: toDictionary(apps) || {},
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        logError(err);
      });
  }

  render() {
    const { match } = this.props;
    const { apps, isLoading } = this.state;

    return (
      <Fragment>
        {isLoading ? (
          <span>LOADING...</span>
        ) : (
          <Switch>
            <ProtectedRoute
              exact
              path={`${match.url}`}
              component={AppList}
              apps={apps}
            />
            <ProtectedRoute
              path={`${match.url}/:id`}
              component={AppDetails}
              apps={apps}
            />
            <Redirect to={`${match.url}`} />
          </Switch>
        )}
      </Fragment>
    );
  }
}

export default withRouter(AppDirectory);
