import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './AppList.css';

const AppList = ({ apps }) => (
  <Fragment>
    <h1>Apps</h1>
    <ul className="items">
      {apps.map(app => (
        <li key={app.id}>
          <Link to={`apps/${app.id}`}>
            {/* <img src={app.logo} alt={app.name} /> */}
            <strong>{app.name}</strong>
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);
export default AppList;
