import React, { Component, createContext } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../App';
import AppList from './AppsList';
import AppEdit from './AppEdit';
import AppDetails from './AppDetails';
import {
  API_URL,
  authHeader,
  toDictionary,
  logError,
  getJSON,
} from '../../utils/helpers';

export const AppsContext = createContext({
  apps: {},
  updateApp: () => {},
});

class AppDirectory extends Component {
  constructor(props) {
    super(props);
    this.updateApp = this.updateApp.bind(this);
    this.state = { apps: {}, isLoading: true };
  }

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

  updateApp(app) {
    const id = app.id;
    this.setState({ apps: { [id]: app, ...this.state.apps } });
  }

  render() {
    const { updateApp } = this;
    const { match } = this.props;
    const { apps, isLoading } = this.state;

    return (
      <AppsContext.Provider value={{ apps, updateApp }}>
        {isLoading ? (
          <span>LOADING...</span>
        ) : (
          <Switch>
            <ProtectedRoute exact path={`${match.url}`} component={AppList} />
            <ProtectedRoute
              path={`${match.url}/:id/edit`}
              component={AppEdit}
            />
            <ProtectedRoute
              exact
              path={`${match.url}/:id`}
              component={AppDetails}
            />
            <Redirect to={`${match.url}`} />
          </Switch>
        )}
      </AppsContext.Provider>
    );
  }
}

export default withRouter(AppDirectory);
