import React, { Component } from 'react';

class AppDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <span>I'm a detail! {JSON.stringify(this.props)}</span>;
  }
}

export default AppDetails;
