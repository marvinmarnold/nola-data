import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';

import { Navbar } from '../components/Navbar.jsx';
import PolygonFormContainer from '../containers/PolygonFormContainer.jsx';

export default class MexEco extends Component {
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
            <h1>Map</h1>
            <div className="row">
              <PolygonFormContainer
                currentPolygon={this.props.currentPolygon}
                insertingPolygon={this.props.insertingPolygon} />

              <div className="col-xs-12 col-md-10 offset-md-1">
                <div id="map"></div>
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
