serviceCallsToFeatureJSON = function(serviceCalls) {
  var features = _.map(serviceCalls, serviceCall => {
    return serviceCallToFeatureJSON(serviceCall)
  })

  return  {
    "type": "FeatureCollection",
    "features": features
  }
}

var serviceCallToFeatureJSON = function(serviceCall) {
  return {
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [serviceCall.longitude, serviceCall.latitude]
      },
      "properties": {
          "title": title(serviceCall),
          "marker-symbol": "monument",
          "marker-color": color(serviceCall),
          "marker-size": "small"
      }
    }
}

var title = function(serviceCall) {
  return serviceCall.nopdTypeDesc +
  " / " + serviceCall.nopdType +
  " / " + miliToMin(serviceCall.arrivedIn)+ "min / " + serviceCall.createdAt
}

var color = function(serviceCall) {
  var arrivedIn = serviceCall.arrivedIn

  var oneMin = 1000 * 60
  var littlest = oneMin * 2.5
  var little = oneMin * 5
  var mid = oneMin * 15
  var high = oneMin * 30
  var highest = oneMin * 60

  if(arrivedIn < littlest) {
    return "#615ff7"
  } else if(arrivedIn < little) {
    return "#44a781"
  } else if(arrivedIn < mid) {
    return "#c8f23d"
  } else if(arrivedIn < high) {
    return "#d16c24"
  } else if(arrivedIn < highest) {
    return "#ba3131"
  } else {
    return "#000"
  }
}

var miliToMin = function(milis) {
  return parseInt(milis / 1000 / 60)
}
