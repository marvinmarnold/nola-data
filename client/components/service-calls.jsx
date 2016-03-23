var map = undefined;
var markerLayer = undefined;

ServiceCallsMap = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    serviceCalls: React.PropTypes.array.isRequired
  },

  getMeteorData() {
    var thiz = this

    Tracker.autorun(function () {
      if (Mapbox.loaded()) {

        if(!map) {
          L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

          map = L.mapbox.map('map', 'mapbox.streets').setView([
            29.942355,
            -90.078635
          ], 12);

          markerLayer = L.mapbox
            .featureLayer(serviceCallsToFeatureJSON(thiz.props.serviceCalls))
            .addTo(map);

          for(let i = 1; i <= NUM_DISTRICTS; i++) {
            console.log('drawing district ' + i);
            L.polygon(districtLatLngs(i), {color: "#55da8e"}).addTo(map);
          }
        }

        console.log(thiz.props.serviceCalls.length);
        markerLayer.setGeoJSON(serviceCallsToFeatureJSON(thiz.props.serviceCalls))
      }
    });

    return {

    }
  },

  render() {
    return <div id="map"></div>
  }
})
