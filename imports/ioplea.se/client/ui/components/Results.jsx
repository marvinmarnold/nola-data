import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stuffs } from '../../../common/collections/stuffs.js';

class Results extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.query}</h1>
        <h2>{this.props.thingId}</h2>
      </div>
    );
  }
}

export default createContainer(({query, thingId}) => {
  return {
    query,
    thingId
  };
}, Results);
