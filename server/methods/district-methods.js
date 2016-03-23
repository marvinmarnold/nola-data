Meteor.methods({
  'districts/ordered': function() {
    // get count of calls in each district
    var counts = []

    for(let i = 1; i <= NUM_DISTRICTS; i++) {
      counts.push({
        districtNum: i,
        count: ServiceCalls.find({district: i}).count()
      })
    }

    return _.sortBy(counts, "count")
  }
});
