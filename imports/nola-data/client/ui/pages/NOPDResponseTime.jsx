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

  viewPoliceDistricts() {
    this.setState({
      view: STATES.VIEW.POLICE_DISTRICTS
    });
  }

  viewCensusTracts() {
    this.setState({
      view: STATES.VIEW.CENSUS_TRACTS
    });
  }

  renderDistrictLayer() {
    _.each(this.props.districts, district => {
      const districtLatLngs = _.map(district.boundaries, boundary => {
        return [boundary.latitude, boundary.longitude]
      });

      L.polygon(districtLatLngs, {color: "#000000"})
        .bindLabel(district.name)
        .addTo(districtLayer);
    });
  }

  renderTractLayer() {
    console.log('renderTract');
  }

  renderBoundaryType() {
    return (
      <div>
        <h3>Select View</h3>
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active" onClick={this.viewPoliceDistricts.bind(this)} >
            <input type="radio" name="options" id="view-police-districts-radio" defaultChecked /> Police Districts
          </label>
          <label className="btn btn-primary" onClick={this.viewCensusTracts.bind(this)} >
            <input type="radio" name="options" id="view-census-tracts-radio" /> Census Tracts
          </label>
        </div>
      </div>
    );
  }

  render() {
    if(!this.props.loading) {
      this.props.districtLayer.setGeoJSON([]);

      if(this.state.view === STATES.VIEW.POLICE_DISTRICTS) {
        this.renderDistrictLayer();
      } else if(this.state.view === STATES.VIEW.CENSUS_TRACTS) {
        this.renderTractLayer();
      }
    }

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
  loading: React.PropTypes.bool,
  map: React.PropTypes.object,
  districtLayer: React.PropTypes.object
};

let map, districtLayer;
export default createContainer(() => {

  const districtsHandle = Meteor.subscribe('districts');
  const loading = !districtsHandle.ready();
  const districts = Districts.find().fetch();

  const initMap = () => {
    L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

    map = L.mapbox.map('map', 'mapbox.streets').setView([
      29.942355,
      -90.078635
    ], 12);

    districtLayer = L.mapbox.featureLayer().addTo(map);
  };

  Tracker.autorun(function () {
    if (Mapbox.loaded()) {
      if(!map) {
        initMap();
      }
    }
  });

  return {
    districts: districts,
    loading: loading || !map,
    map: map,
    districtLayer: districtLayer
  };
}, NOPDResponseTime);
