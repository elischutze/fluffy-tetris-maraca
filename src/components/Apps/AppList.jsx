import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './AppPages.styles.css';

const AppList = ({ apps }) => (
  <Fragment>
    <h1>Apps</h1>
    <ul className="items app-items">
      {Object.keys(apps).map(id => (
        <li key={id}>
          <Link to={`/apps/${id}`}>
            <strong>{apps[id].name}</strong>
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);
export default AppList;
