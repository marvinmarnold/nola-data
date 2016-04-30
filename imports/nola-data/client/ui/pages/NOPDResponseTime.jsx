import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { STATES } from '../../states.js';
import { Districts } from '../../../collections/districts.js';
import { Tracts } from '../../../collections/tracts.js';
import { SERVICE_CALL_TYPES } from '../../../lib/service-call-types.js';

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
        .addTo(this.props.districtLayer);
    });
  }

  renderTractLayer() {
    _.each(this.props.tracts, tract => {
      const tractLatLngs = _.map(tract.boundaries, boundary => {
        return [boundary.latitude, boundary.longitude]
      });

      L.polygon(tractLatLngs, {color: "#000000"})
        .bindLabel(tract.name)
        .addTo(this.props.tractLayer);
    });
  }

  renderBoundaryFilter() {
    return (
      <div className='m-t-1'>
        <h3>Select View</h3>
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active" onClick={this.viewPoliceDistricts.bind(this)} >
            <input type="radio" name="options" defaultChecked /> Police Districts
          </label>
          <label className="btn btn-primary" onClick={this.viewCensusTracts.bind(this)} >
            <input type="radio" name="options" /> Census Tracts
          </label>
        </div>
      </div>
    );
  }

  renderPriorityFilter() {
    return (
      <div className='m-t-1'>
        <h3>Filter by Priority</h3>
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active">
            <input type="radio" name="options" defaultChecked /> All Priorities
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" /> High Priority
          </label>
          <label className="btn btn-primary" >
            <input type="radio" name="options" /> Low Priority
          </label>
        </div>
      </div>
    );
  }

  renderTypeFilter() {
    return (
      <div className='m-t-1'>
        <h3>Filter by Type</h3>
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active">
            <input type="checkbox" defaultChecked />  All Types
          </label>

          {_.map(SERVICE_CALL_TYPES, (desc, _type) => {
            return (
              <label className="btn btn-primary" key={_type}>
                <input type="checkbox" />  {_type} - {desc}
              </label>
            )
          })}
        </div>
      </div>
    );
  }

  render() {
    if(!this.props.loading) {
      this.props.districtLayer.setGeoJSON([]);
      this.props.tractLayer.setGeoJSON([]);

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
            {this.renderBoundaryFilter()}
            {this.renderPriorityFilter()}
            {this.renderTypeFilter()}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <h1>Results Summary</h1>

          </div>
        </div>
      </div>
    );
  }
}

NOPDResponseTime.propTypes = {
  districts: React.PropTypes.array,
  tracts: React.PropTypes.array,
  loading: React.PropTypes.bool,
  map: React.PropTypes.object,
  districtLayer: React.PropTypes.object,
  tractLayer: React.PropTypes.object
};

let map, districtLayer, tractLayer;
export default createContainer(() => {

  const districtsHandle = Meteor.subscribe('districts');
  const tractsHandle = Meteor.subscribe('tracts');

  const loading = !districtsHandle.ready() || !tractsHandle.ready();
  const districts = Districts.find().fetch();
  const tracts = Tracts.find().fetch();

  const initMap = () => {
    L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

    map = L.mapbox.map('map', 'mapbox.streets').setView([
      29.942355,
      -90.078635
    ], 12);

    districtLayer = L.mapbox.featureLayer().addTo(map);
    tractLayer = L.mapbox.featureLayer().addTo(map);
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
    tracts: tracts,
    loading: loading || !map,
    map: map,
    districtLayer: districtLayer,
    tractLayer: tractLayer
  };
}, NOPDResponseTime);
