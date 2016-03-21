App = React.createClass({
  componentDidMount() {
    Tracker.autorun(function() {
      if(Mapbox.loaded()) {
        console.log("Mapbox loaded");
        L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;
        var map = L.mapbox.map('map', 'mapbox.streets').setView([29.942355, -90.078635], 12);

        // var heat = L.heatLayer(servicePoints(), {maxZoom: 18}).addTo(map);

        _.each(markers(), m => {
          L.marker([m[0], m[1]], {
              icon: L.mapbox.marker.icon({
                  'marker-size': 'small',
                  'marker-symbol': 'bus',
                  'marker-color': m[2]
              })
          }).bindLabel(m[3]).addTo(map);
        })
      }
    });
  },

  render() {
    return (
      <div>
        <h1>NOPD Service Calls 2016</h1>
        <div id="map">

        </div>
      </div>
    )
  }
})

var markers = function() {
  var serviceCalls = ServiceCalls.find({arrivedIn: {$gt: 0}}).fetch()

  return _.map(serviceCalls, c => {
    var row = [
      parseFloat(c.latitude),
      parseFloat(c.longitude),
      markerColor(c),
      c.typeDesc
      // parseFloat(parseInt(c.arrivedIn) / max)
    ]

    return row
  })
}

var servicePoints = function() {
  var serviceCalls = ServiceCalls.find({arrivedIn: {$gt: 0}}).fetch()
  // var max = _.max(serviceCalls, c => { return parseInt(c.arrivedIn) }).arrivedIn
  //
  // console.log('max ' + max);
  return _.map(serviceCalls, c => {
    console.log(c.arrivedIn);

    var row = [
      parseFloat(c.latitude),
      parseFloat(c.longitude),
      intensity(c)
      // parseFloat(parseInt(c.arrivedIn) / max)
    ]

    console.log(row);
    return row
  })
}

//http://stackoverflow.com/questions/25354656/mapbox-dynamic-markers-in-meteor-js
var intensity = function(serviceCall) {
  var arrivedIn = parseInt(serviceCall.arrivedIn)
  console.log(serviceCall.createdAt + " " + serviceCall.arrivedAt);
  var oneMin = 1000 * 60
  var fiveMin = oneMin * 5
  var fifteenMin = oneMin * 15
  var oneHour = oneMin * 60
  if(arrivedIn < oneMin) {
    return 0.25
  } else if(arrivedIn < fiveMin) {
    return 0.5
  } else if(arrivedIn < fifteenMin) {
    return 0.75
  } else {
    return 1
  }
}

var markerColor = function(serviceCall) {
  var arrivedIn = parseInt(serviceCall.arrivedIn)
  console.log(serviceCall.createdAt + " " + serviceCall.arrivedAt);
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
