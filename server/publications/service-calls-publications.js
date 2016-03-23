Meteor.publish("service-calls/arrived-at", function(limit) {
  return ServiceCalls.find({arrivedIn: {$gt: -1}}, {limit: limit})
});
