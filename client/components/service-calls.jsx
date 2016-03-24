var map = undefined;
var markerLayer = undefined;
var districtLayer = undefined;

ServiceCallsMap = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    serviceCalls: React.PropTypes.array.isRequired,
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

          districtLayer = L.mapbox.featureLayer().addTo(map);
        }

        if(map) {
          districtLayer.setGeoJSON([])
          var selector = {}

          // var filters = ['priorityNum', 'nopdType', 'startDate', 'endDate']
          // _.each(filters, filter => {
          //   var filterVal = thiz.props.state[filter]
          //   if(filterVal)
          //     selector[filter] = filterVal
          // })

          var priorityNum = thiz.props.state.priorityNum
          if(priorityNum)
            selector.priorityNum = priorityNum

          var nopdType = thiz.props.state.nopdType
          if(nopdType)
            selector.nopdType = nopdType

          var startDate = thiz.props.state.startDate
          if(startDate)
            selector.createdAt = {$gte: startDate}

          var endDate = thiz.props.state.endDate
          if(endDate)
            selector.createdAt = {$lte: endDate}

          console.log(selector);

          Meteor.call("districts/avg-waits", selector, function(error, orderedDistricts) {
            if(error)
              console.log("error", error);

            if(orderedDistricts) {
              for(let i = 0; i < NUM_DISTRICTS; i++) {
                var districtNum = orderedDistricts[i].districtNum
                var avgWait = orderedDistricts[i].avg_wait / 1000 / 60
                var ord = i + 1

                L.polygon(districtLatLngs(districtNum), {color: oridnalDistrictColor(ord)})
                  .bindLabel('#' + ord + ' - ' + avgWait + 'min')
                  .addTo(districtLayer);
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
