import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import Mapbox from 'mapbox';
import Draw from 'mapbox-gl-draw';

import { Polygons } from '../../../common/collections/polygons.js';

import { Navbar } from '../components/Navbar.jsx';
import { PolygonForm } from '../components/PolygonForm.jsx';

import { SESSION } from '../../constants.js';

class MexEco extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.initMap()
  }

  render() {
    return (
      <div>
        <Navbar />
          <div className="container-fluid">

            <div className="row">
              <div className="col-xs-12 col-lg-8">
                <h1>Map</h1>
                <div id="map"></div>
              </div>
              <div className="col-xs-12 col-lg-4">
                <PolygonForm
                  currentPolygon={this.props.currentPolygon}
                  insertingPolygon={this.props.insertingPolygon} />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

MexEco.propTypes = {
  loading: React.PropTypes.bool,
  map: React.PropTypes.object,
  initMap: React.PropTypes.func,
  currentPolygon: React.PropTypes.object,
  insertingPolygon: React.PropTypes.bool
};

let map

export default createContainer(() => {
  currentPolygon = Session.get(SESSION.POLYGON);
  insertingPolygon = Session.get(SESSION.INSERTING);

  console.log("addingPolygon");
  console.log(insertingPolygon);

  const initMap = () => {
    if(!map) {
      mapboxgl.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/unplugged/ciqzoiuob0008bmm6gxph8irp',
        center: [-99.138173, 19.416424],
        zoom: 5
      });

      var draw = Draw({
        controls: {
          point: false,
          line_string: false,
          polygon: true,
          trash: false
        }
      });
      map.addControl(draw);

      // draw controls
      map.on('draw.create', (event) => {
        _.each(event.features, poly => {
          const polygon = {
            name: poly.id,
            geoJSON: {
              type: poly.type,
              geometry: {
                type: poly.geometry.type,
                coordinates: poly.geometry.coordinates[0]
              }
            }
          }

          Session.set(SESSION.POLYGON, polygon);
          Session.set(SESSION.INSERTING, true);
        })
      });
    }

  };

  // Tracker.autorun(() => {
  //   // if (Mapbox.loaded()) {
  //     if(!map) {
  //       initMap();
  //     }
  //   // }
  // });

  return {
    loading: false,
    map,
    initMap,
    currentPolygon,
    insertingPolygon
  };
}, MexEco);
