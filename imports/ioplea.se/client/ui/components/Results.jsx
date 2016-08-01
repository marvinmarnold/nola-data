import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stuffs } from '../../../common/collections/stuffs.js';
import { Compatibilities } from '../../../common/collections/compatibilities.js';

class Results extends Component {
  renderOptional(stuff, fieldName, title) {
    return _.has(stuff, fieldName) ? <p>{title}: {stuff[fieldName]}</p> : null;
  }

  renderStuff(stuff) {
    return (
      <div key={stuff._id} className='col-lg-4 col-sm-6 col-xs-12'>
        <a href={stuff.url} className='stuff-card'>
          <div className="card">
            <img className="card-img-top img-fluid m-x-auto" src={stuff.iconUrl} alt={stuff.name} />
            <div className="card-block">
              <h4 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h4>
              <p className="card-text">{stuff.description}</p>
              {_.has(stuff, "version") ? <p>Version: {stuff.version}</p> : null}
              {_.has(stuff, "popularity") ? <p>Rating: {stuff.popularity}</p> : null}
              {_.has(stuff, "updatedAt") ? <p>Updated: {stuff.updatedAt}</p> : null}
            </div>
          </div>
        </a>
      </div>
    )
  }

  renderResultsCount() {
    return this.props.stuffs.length == 1 ? "result" : "results"
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='m-t-2'>
          <h2>{this.props.stuffs.length} {this.renderResultsCount()}</h2>
          <div className='row m-t-2'>
            {this.props.stuffs.map(this.renderStuff)}
          </div>
        </div>
      );
    }
  }
}

export default createContainer(({query, thingId}) => {
  let loading = true;
  let stuffs = [];
  const compatsHandle = Meteor.subscribe("compatibilities");

  if(compatsHandle.ready() && thingId) {
    const compats = Compatibilities.find({thingId}).fetch().map(compat => { return compat.stuffId })
    const stuffsHandle = Meteor.subscribe("stuffs.list", compats);

    if(stuffsHandle.ready()) {
      loading = false;
      stuffs = Stuffs.find().fetch()
    }

  }

  return {
    stuffs,
    loading
  };
}, Results);
