import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppsContext } from './AppsDirectory';
import './AppPages.styles.css';

const AppList = () => (
  <AppsContext.Consumer>
    {({ apps }) => (
      <Fragment>
        <h1>Apps</h1>
        <ul className="items app-items">
          {Object.keys(apps)
            .sort(
              (a, b) => new Date(apps[b].created) - new Date(apps[a].created)
            )
            .map(
              id =>
                console.log(apps[id].created) || (
                  <li key={id}>
                    <Link to={`/apps/${id}`}>
                      <strong>{apps[id].name}</strong>
                    </Link>
                  </li>
                )
            )}
        </ul>
      </Fragment>
    )}
  </AppsContext.Consumer>
);
export default AppList;
