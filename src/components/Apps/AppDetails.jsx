import React, { Fragment, Component } from 'react';
import {
  API_URL,
  authHeader,
  toDictionary,
  getJSON,
  logError,
} from '../../utils/helpers';
import './AppPages.styles.css';

const AppDetails = ({ apps, match }) => {
  const id = match && match.params.id;
  const currentApp = apps && apps[id];

  return !currentApp ? (
    <span>Sorry! Couldn't find that app.</span>
  ) : (
    <Fragment>
      <div className="app-list-main">
        <div className="app-list-info">
          <h1>{currentApp.name}</h1>
          <sub>Created: {currentApp.created.split('T')[0]}</sub>
          <img src={currentApp.logo} alt={`{currentApp.name} App Logo`} />
        </div>
        <Users id={id} />
      </div>
    </Fragment>
  );
};

const getUsersURL = (numUsers, page, appId) =>
  `${API_URL}/apps/${appId}/users?limit=${numUsers}${`&offset=${page *
    numUsers}`}`;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: 25,
      page: 1,
      users: {},
      prevPageAllowed: false,
      nextPageAllowed: true,
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    const { numUsers, page } = this.state;
    this.getUsers(numUsers, page);
  }

  // TODO Optimization: save existing results to state between page changes to avoid re-fetching
  nextPage() {
    const { numUsers, page } = this.state;

    this.setState({ page: page + 1, prevPageAllowed: true });
    this.getUsers(numUsers, page + 1);
  }

  prevPage() {
    const { numUsers, page } = this.state;

    if (page - 1 === 1) {
      this.setState({ prevPageAllowed: false });
    }

    this.setState({ page: page - 1 });
    this.getUsers(numUsers, page - 1);
  }

  getUsers(numUsers, page) {
    const { id, history } = this.props;

    const usersURL = getUsersURL(numUsers, page, id);

    fetch(usersURL, { headers: { ...authHeader } })
      .then(res => (res.status === 401 ? history.push('/login') : res))
      .then(getJSON)
      .then(({ users }) => {
        this.setState({
          users: toDictionary(users) || {},
          nextPageAllowed: users.length === numUsers,
        });
      })
      .catch(logError);
  }

  render() {
    const { prevPage, nextPage, state } = this;
    const { page, users, prevPageAllowed, nextPageAllowed } = state;

    return (
      <div className="app-list-user-container">
        <h2>Users - Page {page}</h2>
        <div className="app-list-users">
          <div>
            <ul className="items user-items">
              {Object.keys(users).map(userId => (
                <li key={userId}>{users[userId].name}</li>
              ))}
            </ul>
          </div>
          <div className="user-pagination">
            <button
              className="btn"
              onClick={prevPage}
              disabled={!prevPageAllowed}
            >
              {'<< Prev Page'}
            </button>
            <button
              className="btn"
              onClick={nextPage}
              disabled={!nextPageAllowed}
            >
              {'Next Page >> '}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AppDetails;
