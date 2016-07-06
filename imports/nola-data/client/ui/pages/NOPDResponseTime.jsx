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
      view: STATES.VIEW.POLICE_DISTRICTS,
      priorityFilter: undefined,
      typeFilter: undefined,
      districtSearchResults: undefined,
      tractSearchResults: undefined
    };
  }

  componentDidMount() {
    this.filter();
  }

  viewPoliceDistricts() {
    const thiz = this;
    this.setState({
      view: STATES.VIEW.POLICE_DISTRICTS
    }, () => {
      thiz.filter();
    });
  }

  viewCensusTracts() {
    const thiz = this;
    this.setState({
      view: STATES.VIEW.CENSUS_TRACTS
    }, () => {
      thiz.filter();
    });
  }

  renderDistrictLayer() {
    if(this.state.districtSearchResults) {
      _.each(this.state.districtSearchResults, result => {
        const district = Districts.findOne(result.objectId);

        const districtLatLngs = _.map(district.boundaries, boundary => {
          return [boundary.latitude, boundary.longitude]
        });

        L.polygon(districtLatLngs, {color: "#000000"})
          .bindLabel(result.message)
          .addTo(this.props.districtLayer);
      });
    } else {
      _.each(this.props.districts, district => {
        const districtLatLngs = _.map(district.boundaries, boundary => {
          return [boundary.latitude, boundary.longitude]
        });

        L.polygon(districtLatLngs, {color: "#000000"})
          .bindLabel("District #" + district.name)
          .addTo(this.props.districtLayer);
      });
    }
  }

  renderTractLayer() {
    if(this.state.tractSearchResults) {
      _.each(this.state.tractSearchResults, result => {
        const tract = Tracts.findOne(result.objectId);

        const tractLatLngs = _.map(tract.boundaries, boundary => {
          return [boundary.latitude, boundary.longitude]
        });

        L.polygon(tractLatLngs, {color: "#000000"})
          .bindLabel(result.message)
          .addTo(this.props.districtLayer);
      });
    } else {
      _.each(this.props.tracts, tract => {
        const tractLatLngs = _.map(tract.boundaries, boundary => {
          return [boundary.latitude, boundary.longitude]
        });

        L.polygon(tractLatLngs, {color: "#000000"})
          .bindLabel("Census Tract #" + tract.name)
          .addTo(this.props.tractLayer);
      });
    }
  }

  filter() {
    const thiz = this;
    if(this.state.view === STATES.VIEW.POLICE_DISTRICTS) {
      Meteor.call("districts.avgWaits", this.state.priorityFilter, this.state.typeFilter,
        function(error, result) {
          if(error){
            console.log("error", error);
          }
          if(result) {
            thiz.setState({districtSearchResults: result});
          }
      });
    } else if(this.state.view === STATES.VIEW.CENSUS_TRACTS) {
      Meteor.call("tracts.avgWaits", this.state.priorityFilter, this.state.typeFilter,
        function(error, result) {
          if(error){
            console.log("error", error);
          }
          if(result) {
            thiz.setState({tractSearchResults: result});
          }
      });    }
  }

  renderBoundaryFilter() {
    return (
      <div className="btn-group" data-toggle="buttons">
        <label className="btn btn-primary active" onClick={this.viewPoliceDistricts.bind(this)} >
          <input type="radio" name="view-filter" defaultChecked /> Police Districts
        </label>
        <label className="btn btn-primary" onClick={this.viewCensusTracts.bind(this)} >
          <input type="radio" name="view-filter" /> Census Tracts
        </label>
      </div>
    );
  }

  filterPriority(priorityFilter) {
    const thiz = this;
    // wait for setState transition to finish before updating filter
    this.setState({priorityFilter}, () => {
      thiz.filter();
    });
  }

  filterType(typeFilter) {
    const thiz = this;
    // wait for setState transition to finish before updating filter
    this.setState({typeFilter}, () => {
      thiz.filter();
    });
  }

  renderPriorityFilter() {
    return (
      <div className="btn-group" data-toggle="buttons">
        <label className="btn btn-primary active" onClick={() => this.filterPriority(undefined)}>
          <input type="radio" name="priority-filter" defaultChecked /> All Priorities
        </label>
        <label className="btn btn-primary" onClick={() => this.filterPriority(2)}>
          <input type="radio" name="priority-filter" /> High Priority
        </label>
        <label className="btn btn-primary" onClick={() => this.filterPriority(1)}>
          <input type="radio" name="priority-filter" /> Low Priority
        </label>
      </div>
    );
  }

  renderTypeFilter() {
    return (
      <div className="btn-group" data-toggle="buttons">
        <label className="btn btn-primary active" onClick={() => this.filterType(undefined)}>
          <input type="radio" name="type-filter" defaultChecked />  All Types
        </label>

        {_.map(SERVICE_CALL_TYPES, (desc, _type) => {
          return (
            <label className="btn btn-primary" key={_type} onClick={() => this.filterType(_type)}>
              <input type="radio" name="type-filter" />  {_type} - {desc}
            </label>
          )
        })}
      </div>
    );
  }

  renderResults() {
    if(this.state.districtSearchResults && (this.state.view === STATES.VIEW.POLICE_DISTRICTS)) {
      return this.renderDistrictResults();
    } else if(this.state.tractSearchResults && (this.state.view === STATES.VIEW.CENSUS_TRACTS)) {
      return this.renderTractResults();
    }
  }

  renderDistrictResults() {
    return (
      <ul>
        {_.map(this.state.districtSearchResults, result => {
          return <h4 key={result.objectId}>#{result.rank+1} - {result.message}</h4>
        })}
      </ul>
    );
  }

  renderTractResults() {
    return (
      <ul>
        {_.map(this.state.tractSearchResults, result => {
          return <h4 key={result.objectId}>#{result.rank+1} - {result.message}</h4>
        })}
      </ul>
    );  }

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
            <h1>Results Summary</h1>
            {this.renderResults()}
          </div>
          <div className="col-xs-12 col-lg-4">
            <div id="accordion" role="tablist" aria-multiselectable="true" className='m-t-3'>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <h3>Select View</h3>
                    </a>
                  </h4>
                </div>
                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                  {this.renderBoundaryFilter()}
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTwo">
                  <h4 className="panel-title">
                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <h3>Filter by Priority</h3>
                    </a>
                  </h4>
                </div>
                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                  {this.renderPriorityFilter()}
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingThree">
                  <h4 className="panel-title">
                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <h3>Filter by Type</h3>
                    </a>
                  </h4>
                </div>
                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                  {this.renderTypeFilter()}
                </div>
              </div>
            </div>
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
