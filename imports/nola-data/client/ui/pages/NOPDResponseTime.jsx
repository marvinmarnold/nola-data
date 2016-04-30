import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { STATES } from '../../states.js';
import { Districts } from '../../../collections/districts.js';

class NOPDResponseTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: STATES.VIEW.POLICE_DISTRICTS
    };
  }

  renderBoundaryType() {
    return (
      <div>
        <h3>Select View</h3>
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active">
            <input type="radio" name="options" id="option1" autocomplete="off" defaultChecked /> Police Districts
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" id="option2" autocomplete="off" /> Census Tracts
          </label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <h1>Map</h1>
            <div id="map"></div>
          </div>
          <div className="col-xs-12 col-lg-4">
            <h2>Settings</h2>
            {this.renderBoundaryType()}
            <h3>{this.props.districts.length}</h3>
          </div>
        </div>
      </div>
    );
  }
}

NOPDResponseTime.propTypes = {
  districts: React.PropTypes.array,
  loading: React.PropTypes.bool
};

let map, districtLayer;
export default createContainer(() => {
  
  const districtsHandle = Meteor.subscribe('districts');
  const loading = !districtsHandle.ready();
  const districts = Districts.find().fetch();

  Tracker.autorun(function () {
    if (Mapbox.loaded()) {
      if(!map) {
        L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

        map = L.mapbox.map('map', 'mapbox.streets').setView([
          29.942355,
          -90.078635
        ], 12);

        districtLayer = L.mapbox.featureLayer().addTo(map);
      }

      if(map) {
        districtLayer.setGeoJSON([])
        _.each(districts, district => {
          const districtLatLngs = _.map(district.boundaries, boundary => {
            return [boundary.latitude, boundary.longitude]
          });

          L.polygon(districtLatLngs, {color: "#000000"})
            .bindLabel(district.name)
            .addTo(districtLayer);
        });
      }
    }
  });

  return {
    districts: districts,
    loading: loading
  };
}, NOPDResponseTime);
