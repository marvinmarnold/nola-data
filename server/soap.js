Meteor.startup(function () {
  var config = {
    // find a hostDomain from the listSource method
    hostDomain: 'https://data.nola.gov',
    // An accessible API table from the host domain
    resource: 'wgrp-d3ma',
    // Create account and register app https://opendata.socrata.com
    XAppToken: Meteor.settings.SOCRATA_APP_TOKEN
  };

  var soda = new Socrata(config);

  var sodaCallback = Meteor.bindEnvironment(function(err, response, data) {
    console.log(response);
    _.each(data, insertServiceCall)
  }, function(error) {
    console.log("Soda callback could not bind");
  })

  soda.get(sodaCallback);

});

var insertServiceCall = function(doc) {
  var serviceCall = {
    nopdItem: doc.nopd_item,
    latitude: doc.location.latitude,
    longitude: doc.location.longitude,
    createdAt: doc.timecreate,
    dispatchedAt: doc.timedispatch,
    arrivedAt: doc.timearrive,
    closedAt: doc.timeclosed,
    type: doc.type_,
    typeDesc: doc.typetext,
    zip: doc.zip,
    block: doc.block_address,
    priority: doc.priority,
    district: doc.policedistrict
  }

  if(serviceCall.createdAt && serviceCall.dispatchedAt) {
    var createdAt = new Date(serviceCall.createdAt).getTime()
    var dispatchedAt = new Date(serviceCall.dispatchedAt).getTime()
    serviceCall.dispatchedIn = dispatchedAt - createdAt
  } else {
    serviceCall.dispatchedIn = -1
  }

  if(serviceCall.createdAt && serviceCall.arrivedAt) {
    var createdAt = new Date(serviceCall.createdAt).getTime()
    var arrivedAt = new Date(serviceCall.arrivedAt).getTime()
    serviceCall.arrivedIn = arrivedAt - createdAt
  } else {
    serviceCall.arrivedIn = -1
  }

  ServiceCalls.upsert({
    nopdItem: doc.nopd_item
  }, {
    $set: serviceCall
  })
}
