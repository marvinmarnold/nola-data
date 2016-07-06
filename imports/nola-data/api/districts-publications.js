import { Meteor } from 'meteor/meteor';
import { Districts } from '../collections/districts.js';
import { ServiceCalls } from '../collections/service-calls.js';
import { DistrictSearches } from '../collections/district-searches.js';

Meteor.publish('districts', () => {
  return Districts.find();
});

Meteor.methods({
  'districts.avgWaits': function(priorityFilter, typeFilter) {
    let districtSearch;
    let selector = {};

    if(priorityFilter) {
      selector.priorityNum = priorityFilter;
    }

    if(typeFilter) {
      selector.nopdType = typeFilter;
    }

    console.log(selector);
    districtSearch = DistrictSearches.findOne(selector);

    if(!!districtSearch) {
      console.log('Cached district search located');
      // console.log(districtSearch);
      return districtSearch.results;
    } else {
      console.log('No cached district search');
      // console.log(selector);
      districtSearch = selector;
      selector.arrivedIn = {$exists: true}
      let avgWaits = [];
      let districts = Districts.find().fetch();

      // Caluculate waitTime (average in ms) for each district
      _.each(districts, district => {
        let _selector = selector;
        _selector.districtId = district._id;

        const serviceCalls = ServiceCalls.find(_selector).fetch();

        const totalWait = _.reduce(serviceCalls, (total, serviceCall) => {
          return total + serviceCall.arrivedIn;
        }, 0);

        let waitTime;
        if(totalWait === 0) {
          waitTime = -1;
        } else {
          waitTime = totalWait / serviceCalls.length;
        }

        avgWaits.push({
          objectId: district._id,
          waitTime: waitTime,
          message: "Wait time: " + parseInt(waitTime / 1000 / 60) + "min"
        })
      });

      avgWaits = _.sortBy(avgWaits, "waitTime");

      for(let i = 0; i < avgWaits.length; i++) {
        avgWaits[i].rank = i;
      }

      districtSearch.updatedAt = new Date();
      districtSearch.results = avgWaits;
      const searchId = DistrictSearches.insert(districtSearch);

      return avgWaits;
    }
  }
});
