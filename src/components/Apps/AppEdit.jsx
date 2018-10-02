import React, { Fragment, Component } from 'react';
import {
  API_URL,
  authHeader,
  getJSON,
  logError,
  putJSONOptions,
} from '../../utils/helpers';
import { Link, withRouter } from 'react-router-dom';
import './AppPages.styles.css';
import { AppsContext } from './AppsDirectory';

class AppEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appLogo: '',
    };
    this.editApp = this.editApp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  editApp(evt, updateContext, currentApp) {
    evt.preventDefault();
    const { id } = this.props.match.params;
    fetch(`${API_URL}/apps/${id}`, {
      ...putJSONOptions,
      headers: {
        ...putJSONOptions.headers,
        Authorization: authHeader.Authorization,
      },
      body: JSON.stringify({
        name: this.state.appName || currentApp.name,
        logo: this.state.appLogo || currentApp.logo,
      }),
    })
      .then(getJSON)
      .then(({ app }) => {
        if (app) {
          updateContext(app);
          this.props.history.push('/');
        } else {
          throw new Error('no app returned');
        }
      })
      .catch(logError);
  }

  handleInputChange(evt, field) {
    this.setState({ [field]: evt.currentTarget.value });
  }

  render() {
    const { state, editApp, props } = this;
    const { match } = props;
    const { appName, appLogo } = state;
    const id = match && match.params.id;

    return (
      <AppsContext.Consumer>
        {({ apps, updateApp }) => (
          <Fragment>
            <div>
              <form
                className="edit"
                onSubmit={evt => editApp(evt, updateApp, apps[id])}
              >
                <h1>Edit</h1>
                <fieldset>
                  <input
                    type="text"
                    value={appName}
                    placeholder={apps[id].name}
                    onChange={evt => {
                      this.handleInputChange(evt, 'appName');
                    }}
                  />
                  <input
                    type="text"
                    value={appLogo}
                    placeholder={apps[id].logo}
                    onChange={evt => {
                      this.handleInputChange(evt, 'appLogo');
                    }}
                  />
                  <button className="btn cancel-btn">
                    <Link to={`${id}`}>Cancel</Link>
                  </button>
                  <input type="submit" value="Done" className="btn" />
                </fieldset>
              </form>
            </div>
            <div />
          </Fragment>
        )}
      </AppsContext.Consumer>
    );
  }
}

export default withRouter(AppEdit);
