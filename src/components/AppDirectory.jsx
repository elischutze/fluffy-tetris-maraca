import React, { Component, Fragment } from 'react';
import { ProtectedRoute } from '../App';
import { Switch, Redirect } from 'react-router-dom';
import AppList from './AppList';
import AppDetails from './AppDetails';

class AppDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [
        {
          id: '903b2b77-f239-415d-8715-631da49381ca',
          name: 'Awesome Soft Towels',
          created: '2018-05-25T21:13:43.989Z',
          logo: 'http://lorempixel.com/400/400/animals',
        },
        {
          id: 'a1c1e4ed-7de4-484a-bcf6-540a6d39b5b7',
          name: 'Tasty Steel Shoes',
          created: '2018-01-25T01:44:28.770Z',
          logo: 'http://lorempixel.com/400/400/animals',
        },
      ],
    };
  }
  componentDidMount() {}

  render() {
    const { match } = this.props;
    const { apps } = this.state;
    console.log(this.props);
    return (
      <Fragment>
        Hey
        <Switch>
          <ProtectedRoute
            exact
            path={`${match.url}`}
            component={AppList}
            apps={apps}
          />
          } />
          <ProtectedRoute
            path={`/:id`}
            component={AppDetails}
            app={apps.find(app => {
              console.log(app.id, match.params.id);
              return app.id === match.params.id;
            })}
          />
          <Redirect to={`${match.url}`} />
        </Switch>
      </Fragment>
    );
  }
}

export default AppDirectory;
