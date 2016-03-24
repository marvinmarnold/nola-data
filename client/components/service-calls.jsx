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

          Meteor.call("districts/avg-waits", function(error, orderedDistricts) {
            if(error)
              console.log("error", error);

            if(orderedDistricts) {
              for(let i = 0; i < NUM_DISTRICTS; i++) {
                var districtNum = orderedDistricts[i].districtNum
                var avgWait = orderedDistricts[i].avg_wait / 1000 / 60
                L.polygon(districtLatLngs(districtNum), {color: oridnalDistrictColor(i+1)})
                  .bindLabel('#' + i + ' - ' + avgWait + 'min')
                  .addTo(map);
              }
            }
          });

        }

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
