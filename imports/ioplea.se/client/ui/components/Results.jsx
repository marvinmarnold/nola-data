import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stuffs } from '../../../common/collections/stuffs.js';

class Results extends Component {

  render() {
    return (
      <h1>{this.props.query}</h1>
    );
  }
}

export default createContainer(({query}) => {
  return {
    query
  };
}, Results);
