var map = undefined;
var markerLayer = undefined;

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Tracker.autorun(function () {
      console.log('subscriptions ready ');
        if (Mapbox.loaded()) {
          console.log("Mapbox loaded " + ServiceCalls.find().count());
          L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

          if(!map)
            map = L.mapbox.map('map', 'mapbox.streets').setView([29.942355, -90.078635], 12);

          if(map) {
            console.log('setting marker layer');
            if(!markerLayer)
              markerLayer = L.mapbox.featureLayer(geojsonMarkers()).addTo(map);
            // var heat = L.heatLayer(servicePoints(), {maxZoom: 18}).addTo(map);


            markerLayer.setGeoJSON(geojsonMarkers())
            console.log(geojsonMarkers());
          }

        }
    });

    return {
      serviceCalls: ServiceCalls.find({}, {limit: 100}).fetch()
    }
  },

  componentDidMount() {
    // map = undefined;
    // markerLayer = undefined;
  },

  render() {
    return (
      <div>
        <h1>NOPD Service Calls 2016</h1>
        <p>Displaying time it took NOPD to arrive on scence after 911 call made.</p>
        <ul>
          <li>Blue - 1 minute or less</li>
          <li>Yellow - 5 minutes or less</li>
          <li>Orange - 15 minutes or less</li>
          <li>Red - 1 hour or less</li>
          <li>Black - more than an hour</li>
        </ul>

        <div id="map"></div>
      </div>
    )
  }
})

// var markers = function() {
//   var serviceCalls = ServiceCalls.find({arrivedIn: {$gt: 0}}).fetch()
//
//   return _.map(serviceCalls, c => {
//     var arrivedIn = parseInt(parseInt(c.arrivedIn) / 1000 / 60)
//     var row = [
//       parseFloat(c.latitude),
//       parseFloat(c.longitude),
//       markerColor(c),
//       c.typeDesc + " (" + arrivedIn + "min / " + c.createdAt + ")"
//       // parseFloat(parseInt(c.arrivedIn) / max)
//     ]
//
//     return row
//   })
// }

var geojsonMarkers = function() {
  var serviceCalls = ServiceCalls.find({arrivedIn: {$gt: 0}}).fetch()

  var features = _.map(serviceCalls, c => {
    var arrivedIn = parseInt(parseInt(c.arrivedIn) / 1000 / 60)

    return  {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [c.longitude, c.latitude]
        },
        "properties": {
            "title": c.typeDesc + " (" + arrivedIn + "min / " + c.createdAt + ")",
            "marker-symbol": "monument",
            "marker-color": markerColor(c),
            "marker-size": "small"
        }
      }
    })

    return  {
      "type": "FeatureCollection",
      "features": features
    }
  }


var markerColor = function(serviceCall) {
  var arrivedIn = parseInt(serviceCall.arrivedIn)
  // console.log(serviceCall.createdAt + " " + serviceCall.arrivedAt);
  var oneMin = 1000 * 60
  var fiveMin = oneMin * 5
  var fifteenMin = oneMin * 15
  var oneHour = oneMin * 60
  if(arrivedIn < oneMin) {
    return "#615ff7"
  } else if(arrivedIn < fiveMin) {
    return "#c8f23d"
  } else if(arrivedIn < fifteenMin) {
    return "#d16c24"
  } else if(arrivedIn < oneHour) {
    return "#ba3131"
  } else {
    return "#000"
  }
}
