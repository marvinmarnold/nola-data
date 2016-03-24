Meteor.startup(function () {
  var config = {
    // find a hostDomain from the listSource method
    hostDomain: 'https://data.nola.gov',
    // An accessible API table from the host domain
    resource: 'wgrp-d3ma',
    // Create account and register app https://opendata.socrata.com
    XAppToken: Meteor.settings.SOCRATA_APP_TOKEN
  };

  soda = new Socrata(config);

  if(ServiceCalls.find().count === 0)
    sodaFetch(soda, 0)
});

var sodaFetch = function(soda, offset) {
  console.log("Fetching Socrata " + offset);
  var sodaCallback = Meteor.bindEnvironment(function(err, response, data) {
    _.each(data, insertServiceCall)

    if(data.length > 0)
      sodaFetch(soda, offset + 1000)
  }, function(error) {
    console.log("Soda callback could not bind");
  })

  soda.get({$offset: offset}, sodaCallback);
}

var insertServiceCall = function(doc) {
  var serviceCall = {
    nopdItem: doc.nopd_item,
    latitude: doc.location.latitude,
    longitude: doc.location.longitude,
    createdAt: new Date(doc.timecreate),
    closedAt: new Date(doc.timeclosed),
    nopdType: doc.type_,
    nopdTypeDesc: doc.typetext,
    block: doc.block_address,
    priorityNum: doc.priority.substr(0,1),
    priorityLetter: doc.priority.substr(1),
    district: doc.policedistrict
  }

  if(doc.timearrive)
    serviceCall.arrivedAt = new Date(doc.timearrive)

  if(doc.timedispatch)
    serviceCall.dispatchedAt = new Date(doc.timedispatch)

  if(doc.zip)
    serviceCall.zip = doc.zip

  if(serviceCall.createdAt && serviceCall.dispatchedAt) {
    var createdAt = serviceCall.createdAt.getTime()
    var dispatchedAt = serviceCall.dispatchedAt.getTime()
    serviceCall.dispatchedIn = dispatchedAt - createdAt
  }

  if(serviceCall.createdAt && serviceCall.arrivedAt) {
    var createdAt = serviceCall.createdAt.getTime()
    var arrivedAt = serviceCall.arrivedAt.getTime()
    serviceCall.arrivedIn = arrivedAt - createdAt
  }

  ServiceCalls.upsert({
    nopdItem: serviceCall.nopdItem
  }, {
    $set: serviceCall
  })
}
