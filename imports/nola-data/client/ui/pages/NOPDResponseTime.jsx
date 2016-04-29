import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class NOPDResponseTime extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <h1>Map</h1>
            <div id="map"></div>
          </div>
          <div className="col-xs-12 col-lg-4">
            <h2>Details</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default createContainer(() => {
  let map;
  Tracker.autorun(function () {
    if (Mapbox.loaded()) {
      if(!map) {
        L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

        map = L.mapbox.map('map', 'mapbox.streets').setView([
          29.942355,
          -90.078635
        ], 12);
      }
    }
  });

  return {

  };
}, NOPDResponseTime);
