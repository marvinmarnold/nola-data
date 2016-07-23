import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar } from '../components/Navbar.jsx';
import Mapbox from 'mapbox';

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
  initMap: React.PropTypes.func
};

let map

export default createContainer(() => {

  const initMap = () => {
    if(!map) {
      L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

      map = L.mapbox.map('map').setView([
        19.416424, -99.138173
      ], 7);

      L.mapbox.styleLayer('mapbox://styles/unplugged/ciqzoiuob0008bmm6gxph8irp').addTo(map);
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
    map: map,
    initMap: initMap
  };
}, MexEco);
